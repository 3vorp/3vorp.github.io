// lol
const CHOICES_URL =
	"https://raw.githubusercontent.com/3vorp/Spunch-Bot/main/assets/wordle_choices.txt";
const ANSWERS_URL =
	"https://raw.githubusercontent.com/3vorp/Spunch-Bot/main/assets/wordle_answers.txt";

export const ALLOWED_CHARS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

/** these are used as css class names as well so it can't be an enum */
export type LetterType = "empty" | "exact" | "includes" | "none";

export interface LetterState {
	type: LetterType;
	letter: string;
}

/** Get color for a given letter */
export function getLetterState(target: string, letter: string, i: number): LetterState {
	letter = letter.toLowerCase();
	if (target[i] === letter) return { type: "exact", letter };
	if (target.includes(letter)) return { type: "includes", letter };
	return { type: "none", letter };
}

/** Get colors for a given word (taking duplicates into account) */
export function getWordState(target: string, word: string): LetterState[] {
	const arr = word.split("").map((letter, i) => getLetterState(target, letter, i));

	// remove excess duplicate matches (abbbb vs aaaaa would match every letter otherwise)
	const nInstances: Record<string, number> = {};
	for (const el of arr) {
		nInstances[el.letter] ||= 0;
		++nInstances[el.letter];
		const instancesInTarget = target.split(el.letter).length - 1;
		if (nInstances[el.letter] > instancesInTarget) el.type = "none";
	}
	return arr;
}

/** Get key color from guesses (prioritizes matches) */
export function getKeyColor(guesses: LetterState[], key: string): LetterState {
	if (guesses.some(({ letter, type }) => letter === key && type === "exact"))
		return { type: "exact", letter: key };
	if (guesses.some(({ letter, type }) => letter === key && type === "includes"))
		return { type: "includes", letter: key };
	if (guesses.some(({ letter, type }) => letter === key && type === "none"))
		return { type: "empty", letter: key };
	return { type: "none", letter: key };
}

/** Get share emojj for a given type */
export function getEmojiForType(type: LetterType) {
	switch (type) {
		case "exact":
			return "🟦";
		case "includes":
			return "🟧";
		case "none":
			return "⬛";
		default:
			return "";
	}
}

/** Generate emoji board from guesses */
export function generateEmojiBoard(guesses: LetterState[][]) {
	return guesses.map((g) => g.map(({ type }) => getEmojiForType(type)).join("")).join("\n");
}

/** Load word lists over network */
export async function loadWords() {
	const [choices, answers] = await Promise.all([
		fetch(CHOICES_URL).then((res) => res.text()),
		fetch(ANSWERS_URL).then((res) => res.text()),
	]);

	return {
		choices: choices.split("\n"),
		answers: answers.split("\n"),
	};
}
