/** Represents a single work period session */
export interface TimeRecord {
	start: number;
	stop: number;
	label?: string;
}

/** How often the live timer should update */
export const UPDATE_INTERVAL_MS = 10;

export const sumDuration = (records: TimeRecord[]) =>
	records.reduce((acc, cur) => acc + (cur.stop - cur.start), 0);

export function makeTimer() {
	let isRunning = $state(false);
	let lastStart = $state(-1);
	let lastStop = $state(-1);
	let records = $state<TimeRecord[]>([]);

	// can't use derived value, make sure to update it whenever records changes too
	let liveTimer = $state(0);

	// "correct" time based on accumulated records, independent of JS event loop shenanigans
	const accurateTimer = $derived(sumDuration(records));

	function startTimer() {
		if (!isRunning) return;
		const latest = Date.now() - lastStart;
		liveTimer = latest + accurateTimer;

		setTimeout(startTimer, UPDATE_INTERVAL_MS);
	}

	return {
		/** Start the timer */
		start() {
			isRunning = true;
			lastStart = Date.now();
			startTimer();
			return true;
		},
		/** Stop the timer */
		stop() {
			isRunning = false;
			lastStop = Date.now();
			// don't switch to accurate timer until after the record has been committed
			return false;
		},
		/**
		 * Commit record from stop with optional label
		 * - Not attached to stop() so that hooks can run in between (name modal)
		 */
		addRecord(label?: string) {
			records.push({
				start: lastStart,
				stop: lastStop,
				label,
			});
			liveTimer = accurateTimer;
			lastStart = -1;
			lastStop = -1;
		},
		/** Completely overwrite the existing records (useful for importing old records) */
		setRecords(newRecords: TimeRecord[]) {
			records = newRecords;
			liveTimer = accurateTimer;
		},
		/** Import JSON records with proper type validation */
		importJSONRecords(jsonLike: string) {
			const parsed: TimeRecord[] = JSON.parse(jsonLike);
			if (!Array.isArray(parsed) || !parsed.every((p) => p && "start" in p && "stop" in p))
				throw new Error("Invalid session format!");

			return this.setRecords(parsed);
		},
		/** Reset the entire session */
		resetRecords() {
			return this.setRecords([]);
		},
		/** Whether the timer has any existing records */
		get hasRecords() {
			return records.length > 0;
		},
		/** Whether the timer is currently running */
		get isRunning() {
			return isRunning;
		},
		/** The actual records themselves */
		get records() {
			return records;
		},
		/** Live timer that automatically updates with start/stop events */
		get live() {
			return liveTimer;
		},
		/** stupid hack to be able to display new time before committing change */
		get uncommittedDelta() {
			// doesn't work when there's no delta (timer is ongoing or never started)
			if (lastStart === -1 || lastStop === -1) return -1;
			return lastStop - lastStart;
		},
	};
}
