<div class={["word", { shake: isShaking }]}>
	{#each word as { letter, type }, i (i)}
		<div class={["letter", type]}>{letter}</div>
	{/each}
	{#each Array.from({ length: 5 - word.length })}
		<div class="letter empty"></div>
	{/each}
</div>

<script lang="ts">
import type { LetterState } from "~/helpers/wordle";

const { word = [], isShaking = false }: { word?: LetterState[]; isShaking?: boolean } = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.word {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}

.letter {
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
	color: $content-light;
	font-weight: $weight-bold;
	font-size: 36px;
	width: 64px;
	height: 64px;
	background-color: $bg-light;
	border-radius: $border-radius;
	filter: drop-shadow($drop-shadow);
}

.letter.includes {
	background-color: $caution-dark;
}

.letter.exact {
	background-color: $accent-dark;
}

.letter.empty {
	background-color: $fg-light;
}

@media screen and (max-width: $breakpoint-xs) {
	.word {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		width: 100%;
	}
	.letter {
		aspect-ratio: 1;
		width: 100%;
		height: 100%;
		font-size: 10vw;
	}
}

// https://unused-css.com/blog/css-shake-animation/
$shake-strength: 12px;
@keyframes invalid-shake {
	0% {
		transform: translateX(0);
	}
	25% {
		transform: translateX($shake-strength);
	}
	50% {
		transform: translateX(-$shake-strength);
	}
	75% {
		transform: translateX($shake-strength);
	}
	100% {
		transform: translateX(0);
	}
}

.shake {
	animation: invalid-shake 0.25s infinite;
}
</style>
