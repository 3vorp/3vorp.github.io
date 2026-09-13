<div class="container">
	<div class="all-center">
		<h1>Timesheet Manager</h1>
		<!-- text wrapping gets weird on mobile without line height -->
		<h2 class="text-center" style="line-height: 1.5">Total time working: <code>{timer}</code></h2>
		<button class="widget btn btn-primary btn-lg my-3" onclick={toggleTime}>
			{buttonTitle}
		</button>
	</div>

	<h2>Session Information</h2>
	<div class="card">
		{#if records.length}
			{#each Object.entries(groupedRecords) as [title, records] (title)}
				<div>
					<h3 class="my-0">
						{title} ({records?.length || 0}
						{records?.length === 1 ? "record" : "records"})
					</h3>
					<div class="my-0">
						{#each records as record (record.start)}
							<p class="record my-1">
								Worked for <code>{fmtInterval(record.stop - record.start, true)}</code> between {fmtDate(
									record.start,
								)} and
								{fmtDate(record.stop)}
								{#if record.label}on "{record.label}"{/if}
							</p>
						{/each}
					</div>
				</div>
			{/each}
		{:else}
			<h3 class="my-0 text-center">
				<Fa icon={faExclamationCircle} class="mr-2" />
				No records added yet
			</h3>
		{/if}
	</div>
	<div class="button-row my-5">
		<button class="widget btn" onclick={openImportDialog}>
			<Fa icon={faArrowUpFromBracket} /> Upload Session
		</button>
		<button class={["widget", "btn", { disabled: !records.length }]} onclick={exportSession}>
			<Fa icon={faSave} /> Save Session
		</button>
		<button
			class={["widget", "btn", { disabled: !records.length }]}
			onclick={() => (confirmDialogOpen = true)}
		>
			<Fa icon={faRotateLeft} /> Reset Session
		</button>
	</div>
</div>

<!-- add no matter what -->
<Dialog
	bind:open={nameDialogOpen}
	title={`Name Record (${fmtInterval(lastStop - lastStart, true)})`}
	oncancel={addRecord}
	onconfirm={addRecord}
>
	<input
		type="text"
		bind:value={recordName}
		class="block widget text-field"
		placeholder="Optional record name"
		bind:this={nameField}
	/>
</Dialog>

<Dialog bind:open={importDialogOpen} title="Upload Session" onconfirm={importSession}>
	<input
		type="text"
		bind:value={importedSession}
		class="block widget text-field import-text"
		placeholder="Paste your previous session JSON here…"
		bind:this={importField}
	/>
</Dialog>

<Dialog bind:open={confirmDialogOpen} title="Confirm Reset" destructive onconfirm={resetSession}>
	<p class="my-0">Do you really want to reset your session?</p>
</Dialog>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faArrowUpFromBracket,
	faExclamationCircle,
	faRotateLeft,
	faSave,
} from "@fortawesome/free-solid-svg-icons";
import { onMount, tick } from "svelte";
import Dialog from "~/components/Dialog.svelte";
import { showError, showSuccess } from "~/helpers/snackbar.svelte";

const UPDATE_INTERVAL_MS = 10;
const N_DECIMALS = 3;

interface TimeRecord {
	start: number;
	stop: number;
	label?: string;
}

let isRunning = $state(false);
let lastStart = $state(0);
let lastStop = $state(0);
let timer = $state(fmtInterval(0));
let records = $state<TimeRecord[]>([]);
let confirmDialogOpen = $state(false);

let importDialogOpen = $state(false);
let importedSession = $state("");
let importField: HTMLInputElement;

let nameDialogOpen = $state(false);
let recordName = $state("");
let nameField: HTMLInputElement;

const groupedRecords = $derived(
	Object.groupBy(records, ({ start }) => new Date(start).toLocaleDateString()),
);

const buttonTitle = $derived(isRunning ? "Stop" : "Start");

async function toggleTime() {
	isRunning = !isRunning;
	if (isRunning) {
		lastStart = Date.now();
		startTimer();
	} else {
		lastStop = Date.now();
		nameDialogOpen = true;
		await tick();
		nameField.focus();
	}
}

function addRecord() {
	records.push({
		start: lastStart,
		stop: lastStop,
		label: recordName,
	});

	// force set to accurate time based on record accumulation
	timer = fmtInterval(accurateTimer);

	// reset
	recordName = "";
}

const accurateTimer = $derived(records.reduce((acc, cur) => acc + (cur.stop - cur.start), 0));

function startTimer() {
	if (!isRunning) return;
	const latest = Date.now() - lastStart;
	timer = fmtInterval(latest + accurateTimer);

	setTimeout(startTimer, UPDATE_INTERVAL_MS);
}

// why is this not a default feature
function fmtInterval(ms: number, truncate = false) {
	ms /= 1000;
	const hours = Math.floor(ms / 3600);
	const minutes = Math.floor((ms % 3600) / 60);
	const seconds = (ms % 3600) % 60;

	if (!truncate) {
		const withMinutes = `${String(minutes).padStart(2, "0")}:${seconds.toFixed(N_DECIMALS).padStart(
			// add one for decimal point itself
			3 + N_DECIMALS,
			"0",
		)}`;
		return hours ? `${String(hours).padStart(2, "0")}:${withMinutes}` : withMinutes;
	}
	if (!hours && !minutes) return `${seconds.toFixed(3)}s`;
	if (!hours) return `${minutes}m${Math.round(seconds)}s`;
	return `${hours}h${minutes}m${Math.round(seconds)}s`;
}
function fmtDate(ms: number) {
	return new Date(ms).toLocaleTimeString();
}

async function openImportDialog() {
	importDialogOpen = true;
	await tick();
	importField.focus();
}

function importSession() {
	try {
		const parsed = JSON.parse(importedSession);
		if (!Array.isArray(parsed) || !parsed.every((p) => p && "start" in p && "stop" in p))
			throw new Error("Invalid session format!");

		records = parsed;
		timer = fmtInterval(accurateTimer);
	} catch (err) {
		showError("Failed to parse session", String(err));
	} finally {
		// reset
		importedSession = "";
	}
}

function exportSession() {
	navigator.clipboard.writeText(JSON.stringify(records));
	showSuccess(
		"Copied session data to clipboard!",
		'You can upload this data again later using the "Upload Session" button.',
	);
}

function resetSession() {
	records = [];
	timer = fmtInterval(accurateTimer);
}

onMount(() => {
	window.addEventListener("beforeunload", (ev) => {
		if (isRunning) ev.preventDefault();
	});
});
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.card {
	display: flex;
	flex-flow: column nowrap;
	gap: 1rem;
	width: 100%;
	padding: $padding-container;
	border-radius: $border-radius;
	background-color: $bg-light;
	color: $content-light;
	filter: drop-shadow($drop-shadow);

	// less intense codeblock backgrounds
	code {
		background-color: $bg-dark;
	}
}

.record {
	margin: 3rem;
}

.import-text {
	font-family: monospace;
}

@media screen and (max-width: $breakpoint-sm) {
	.record {
		margin: 0;
	}
}
</style>
