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
	{#if records.length}
		{#each Object.entries(groupedRecords) as [title, records] (title)}
			<div class="card mb-4">
				<button class="record-header" onclick={() => toggleRecord(title)}>
					<div class="record-header-title">
						<span
							class="btn-icon btn-toggle"
							title={hiddenRecords[title] ? "Open Records" : "Close Records"}
						>
							<Fa icon={hiddenRecords[title] ? faChevronRight : faChevronDown} size="lg" />
						</span>
						<h3 class="my-0 ml-n2">
							<code>{fmtInterval(reduceTotalTime(records), true)}</code>
							on
							{title}
						</h3>
					</div>
					<div class="spacer"></div>
					<p class="record-header-subtitle my-0">
						{records.length}
						{records.length === 1 ? "record" : "records"}
					</p>
				</button>
				{#if !hiddenRecords[title]}
					<hr class="mx-4 my-0" />
					<ul class="record-container my-0">
						{#each records as record (record.start)}
							<li class="record my-1">
								<p class="record-title my-0 ml-n2">
									<code>{fmtInterval(record.stop - record.start, true)}</code>
									{#if record.label}{record.label}{:else}<i>Nameless</i>{/if}
								</p>
								<p class="record-subtitle my-0">
									{fmtDate(record.start)} – {fmtDate(record.stop)}
								</p>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	{:else}
		<div class="card pa-4">
			<h3 class="my-0 text-center">
				<Fa icon={faExclamationCircle} class="mr-2" />
				No records added yet
			</h3>
		</div>
	{/if}
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
	faChevronDown,
	faChevronRight,
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

const hiddenRecords: Record<string, boolean> = $state({});

const groupedRecords = $derived(
	// have to cast away Partial which is stupid
	Object.groupBy(Array.from(records).reverse(), ({ start }) =>
		new Date(start).toLocaleDateString(),
	) as Record<string, TimeRecord[]>,
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

const reduceTotalTime = (records: TimeRecord[]) =>
	records.reduce((acc, cur) => acc + (cur.stop - cur.start), 0);

const accurateTimer = $derived(reduceTotalTime(records));

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

function toggleRecord(title: string) {
	hiddenRecords[title] = !hiddenRecords[title];
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

$list-indent: 64px;

.card {
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
	border-radius: $border-radius;
	background-color: $bg-light;
	color: $content-light;
	filter: drop-shadow($drop-shadow);

	// less intense codeblock backgrounds
	code {
		background-color: $bg-dark;
	}
}

.record-header {
	// entire header is clickable
	background: transparent;
	border: none;
	cursor: pointer;
	padding: $padding-container;
	border-radius: $border-radius;

	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: space-between;
	width: 100%;

	transition: all 0.25s ease;

	&:hover {
		background-color: rgba($content-mid, 0.2);
	}

	&:active {
		background-color: rgba($content-mid, 0.5);
	}
}

.record-header-title {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: $padding-container;
}

.record-header-subtitle {
	margin-left: $list-indent;
}

.btn-toggle {
	// subtract gap for real size
	width: calc($list-indent - $padding-container);
}

.record-container {
	padding: $padding-container $padding-container $padding-container
		calc($padding-container + $list-indent);
	display: flex;
	flex-flow: column nowrap;
	gap: 8px;
}

.record {
	display: flex;
	flex-flow: column nowrap;
	gap: 4px;
}

// not quite title weight but like the next closest thing
.record-title {
	font-weight: $weight-semibold;
	font-size: 20px;
}

.record-subtitle,
.record-header-subtitle {
	color: $content-mid;
}

.import-text {
	font-family: monospace;
}
</style>
