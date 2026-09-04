<div class="container">
	<div class="all-center">
		<h1>Timesheet Manager</h1>
		<h2>Total time working: <code>{timer}</code></h2>
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
		<button class="widget btn" onclick={importSession}>
			<Fa icon={faArrowUpFromBracket} />&nbsp; Upload Session
		</button>
		<button class={["widget", "btn", { disabled: !records.length }]} onclick={exportSession}>
			<Fa icon={faSave} />&nbsp; Save Session
		</button>
		<button class={["widget", "btn", { disabled: !records.length }]} onclick={resetSession}>
			<Fa icon={faRotateLeft} />&nbsp; Reset Session
		</button>
	</div>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faArrowUpFromBracket,
	faExclamationCircle,
	faRotateLeft,
	faSave,
} from "@fortawesome/free-solid-svg-icons";

const UPDATE_INTERVAL_MS = 10;
const N_DECIMALS = 3;

interface TimeRecord {
	start: number;
	stop: number;
	label?: string;
}

let isRunning = $state(false);
let lastStart = $state(0);
let timer = $state(fmtInterval(0));
let records: TimeRecord[] = $state([]);

const groupedRecords: Partial<Record<string, TimeRecord[]>> = $derived(
	Object.groupBy(records, ({ start }) => new Date(start).toLocaleDateString()),
);

const buttonTitle = $derived(isRunning ? "Stop" : "Start");

function toggleTime() {
	isRunning = !isRunning;
	if (isRunning) {
		lastStart = Date.now();
		startTimer();
	} else {
		const stop = Date.now();
		const label = prompt("Give this record a name (optional):") || "";
		records.push({
			start: lastStart,
			stop,
			label,
		});
		// force set to accurate time based on record accumulation
		timer = fmtInterval(accurateTimer);
	}
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
	return `${hours}h${minutes}${Math.round(seconds)}s`;
}
function fmtDate(ms: number) {
	return new Date(ms).toLocaleTimeString();
}

function importSession() {
	const value = prompt("Paste your previously-copied session here:") || "[]";
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed) || !parsed.every((p) => p && "start" in p && "stop" in p))
			throw new Error("Invalid session format");

		records = parsed;
		timer = fmtInterval(accurateTimer);
	} catch (err) {
		alert(err);
	}
}

function exportSession() {
	navigator.clipboard.writeText(JSON.stringify(records));
	alert("Session data copied to clipboard!");
}

function resetSession() {
	if (!confirm("Are you sure you want to reset your session?")) return;
	records = [];
	timer = fmtInterval(accurateTimer);
}
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

@media screen and (max-width: $breakpoint-sm) {
	.record {
		margin: 0;
	}
}
</style>
