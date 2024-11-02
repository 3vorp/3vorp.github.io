export const randint = (start: number, stop: number) =>
	start + Math.floor(Math.random() * (stop - start + 1));

export const choice = <T>(arr: T[]): T => arr[randint(0, arr.length - 1)];
