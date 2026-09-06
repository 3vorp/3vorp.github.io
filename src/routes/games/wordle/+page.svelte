<div class="container">
	<h1>Wordle</h1>
	<p class="caption text-center">
		{#if !guesses.length}
			{ALLOWED_GUESSES} chances to guess a 5-letter word.
		{:else if hasWon}
			You won in {guesses.length} guesses!
		{:else if hasLost}
			The word was {target.toUpperCase()}.
		{:else}
			{guesses.length}/{ALLOWED_GUESSES} guesses
		{/if}
	</p>
	<div class="guess-container">
		{#each guesses as guess, i (i)}
			<Word word={getWordState(target, guess)} />
		{/each}
		{#if !hasGameEnded}
			{#if guesses.length < ALLOWED_GUESSES}
				<Word {isShaking} word={curGuess.split("").map((letter) => ({ letter, type: "empty" }))} />
			{/if}
			{#each Array.from({ length: ALLOWED_GUESSES - 1 - guesses.length })}
				<Word />
			{/each}
			<Keyboard guesses={guesses.flatMap((g) => getWordState(target, g))} {onkey} />
		{:else}
			<div class="button-row my-5">
				<button class="widget btn btn-primary" onclick={copyResults}>
					<Fa icon={faShareNodes} /> Share Results
				</button>
				<button class="widget btn" onclick={startGame}>
					<Fa icon={faRotateRight} /> New Game
				</button>
			</div>
		{/if}
	</div>

	<span class="text-center all-center">
		<small class="mt-3">Wordle #{answers.indexOf(target)}</small>
	</span>
</div>

<script lang="ts">
import { onMount } from "svelte";
import { ALLOWED_CHARS, generateEmojiBoard, getWordState, loadWords } from "~/helpers/wordle";

import Word from "./Word.svelte";
import Keyboard from "./Keyboard.svelte";
import Fa from "svelte-fa";
import { faShareNodes, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { choice } from "~/helpers/random";

const ALLOWED_GUESSES = 6;

let choices = $state<string[]>([]);
let answers = $state<string[]>([]);

const guesses = $state<string[]>([]);
let target = $state("");
let curGuess = $state("");
let isShaking = $state(false);

const hasWon = $derived(guesses.includes(target));
const hasLost = $derived(!hasWon && guesses.length >= ALLOWED_GUESSES);
const hasGameEnded = $derived(hasWon || hasLost);

function tryPushGuess() {
	// no need to send feedback, just return
	if (curGuess.length !== 5) return;
	if (guesses.includes(curGuess) || !choices.includes(curGuess)) return shakeGuess();
	guesses.push(curGuess);
	curGuess = "";
}

function onkey(key: string) {
	if (!ALLOWED_CHARS.flat().includes(key) || hasGameEnded) return;
	switch (key) {
		case "Backspace":
			curGuess = curGuess.slice(0, -1);
			break;
		case "Enter":
			return tryPushGuess();
		default:
			if (curGuess.length < 5) curGuess += key;
	}
}

function shakeGuess() {
	isShaking = true;
	setTimeout(() => {
		isShaking = false;
	}, 250);
}

function copyResults() {
	const header = `Evorp's Wordle #${answers.indexOf(target)}: ${hasLost ? "X" : guesses.length}/${ALLOWED_GUESSES}`;
	const emoji = generateEmojiBoard(guesses.map((g) => getWordState(target, g)));
	navigator.clipboard.writeText(`${header}\n${emoji}`);
	alert("Copied results to clipboard!");
}

function startGame() {
	target = choice(answers);
	guesses.length = 0;
	curGuess = "";
	isShaking = false;
}

onMount(() => {
	loadWords().then((words) => {
		choices = words.choices;
		answers = words.answers;
		return startGame();
	});

	window.addEventListener("keydown", (ev) => {
		if (ev.ctrlKey || ev.altKey || ev.metaKey) return;
		onkey(ev.key);
	});
});
</script>

<style lang="scss">
.guess-container {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}
</style>
