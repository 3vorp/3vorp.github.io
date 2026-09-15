export const N_DECIMALS = 3;

// why doesn't javascript provide this by default
export function fmtInterval(ms: number, truncate = false) {
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

// update this if default format doesn't work well
export const fmtDate = (ms: number) => new Date(ms).toLocaleTimeString();
