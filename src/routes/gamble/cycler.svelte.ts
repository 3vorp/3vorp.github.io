// inspired by https://svelte.dev/blog/runes
export interface Cycler<T> {
	cycle(): void;
	readonly current: T;
	readonly next: T;
}

export function makeCycler<T>(opts: T[]): Cycler<T> {
	let index = $state(0);
	// iterate through modes and looping back on complete
	const currentIndex = $derived(index % opts.length);
	const nextIndex = $derived((index + 1) % opts.length);

	const current = $derived(opts[currentIndex]);
	const next = $derived(opts[nextIndex]);

	return {
		cycle: () => void ++index,
		// I wish getter arrow functions existed lol
		get current() {
			return current;
		},
		get next() {
			return next;
		},
	};
}
