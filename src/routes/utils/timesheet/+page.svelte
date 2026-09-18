<div class="container">
	<div class="all-center">
		<h1>Timesheet Manager</h1>
		<!-- text wrapping gets weird on mobile without line height -->
		<h2 class="text-center" style="line-height: 1.5">
			Total time working: <code>{fmtInterval(timer.live)}</code>
		</h2>
		<button class="widget btn btn-primary btn-lg my-3" onclick={toggleTime}>
			{buttonTitle}
		</button>
	</div>

	<h2>Session Information</h2>
	{#if timer.hasRecords}
		{#each Object.entries(recordsByDay) as [title, records] (title)}
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
							<code>{fmtInterval(sumDuration(records), true)}</code>
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
	<div class="grid-3 my-4">
		<button class="widget btn block" onclick={openImportDialog}>
			<Fa icon={faArrowUpFromBracket} /> Upload Session
		</button>
		<button class="widget btn block" disabled={!timer.hasRecords} onclick={exportSession}>
			<Fa icon={faSave} /> Save Session
		</button>
		<button
			class="widget btn block"
			disabled={!timer.hasRecords}
			onclick={() => (confirmDialogOpen = true)}
		>
			<Fa icon={faRotateLeft} /> Reset Session
		</button>
	</div>
</div>

<!-- add no matter what -->
<Dialog
	bind:open={nameDialogOpen}
	title={`Name Record (${fmtInterval(timer.uncommittedDelta, true)})`}
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

<Dialog
	bind:open={confirmDialogOpen}
	title="Confirm Reset"
	destructive
	onconfirm={() => timer.resetRecords()}
>
	<p class="my-0">Do you really want to reset your session?</p>
</Dialog>

<script lang="ts">
import { onMount, tick } from "svelte";

import Fa from "svelte-fa";
import {
	faArrowUpFromBracket,
	faChevronDown,
	faChevronRight,
	faExclamationCircle,
	faRotateLeft,
	faSave,
} from "@fortawesome/free-solid-svg-icons";

import Dialog from "~/components/Dialog.svelte";
import { showError, showSuccess } from "~/helpers/snackbar.svelte";
import { makeTimer, sumDuration, type TimeRecord } from "~/helpers/timer.svelte";
import { fmtDate, fmtInterval } from "~/helpers/dateTime";

const timer = makeTimer();

const hiddenRecords: Record<string, boolean> = $state({});

// basically all of this state is just for the modals lol
let confirmDialogOpen = $state(false);

let importDialogOpen = $state(false);
let importedSession = $state("");
let importField: HTMLInputElement;

let nameDialogOpen = $state(false);
let recordName = $state("");
let nameField: HTMLInputElement;

const buttonTitle = $derived(timer.isRunning ? "Stop" : "Start");

const recordsByDay = $derived(
	// have to cast away Partial which is stupid
	Object.groupBy(Array.from(timer.records).reverse(), ({ start }) =>
		new Date(start).toLocaleDateString(),
	) as Record<string, TimeRecord[]>,
);

async function toggleTime() {
	if (!timer.isRunning) return timer.start();
	timer.stop();
	nameDialogOpen = true;
	await tick();
	nameField.focus();
}

function addRecord() {
	timer.addRecord(recordName);
	// reset
	recordName = "";
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
		timer.importJSONRecords(importedSession);
	} catch (err) {
		showError("Failed to parse session", String(err));
	} finally {
		// reset
		importedSession = "";
	}
}

function exportSession() {
	navigator.clipboard.writeText(JSON.stringify(timer.records));
	showSuccess(
		"Copied session data to clipboard!",
		'You can upload this data again later using the "Upload Session" button.',
	);
}

onMount(() => {
	window.addEventListener("beforeunload", (ev) => {
		if (timer.isRunning) ev.preventDefault();
	});
});
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

$list-indent: 48px;

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
