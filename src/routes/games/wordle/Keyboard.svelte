<div class="keyboard">
	{#each groupedLetters as row (row[0].letter)}
		<div class="row">
			{#each row as key (key.letter + key.type)}
				<button
					class={["key", key.type]}
					title={key.letter}
					onclick={(ev) => onclick(ev, key.letter)}
				>
					<!-- too big to fit on keys on mobile, use icons-->
					{#if key.letter === "Enter"}
						<Fa icon={faCheck} title="Enter" />
					{:else if key.letter === "Backspace"}
						<Fa icon={faDeleteLeft} />
					{:else}
						{key.letter}
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>

<script lang="ts">
import { faCheck, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";
import { ALLOWED_CHARS, getKeyColor, type LetterState } from "~/helpers/wordle";

const { guesses, onkey }: { guesses: LetterState[]; onkey: (ev: string) => void } = $props();

const groupedLetters = $derived.by(() =>
	ALLOWED_CHARS.map((charset) => charset.map((key) => getKeyColor(guesses, key))),
);

function onclick(ev: MouseEvent, key: string) {
	onkey(key);
	// unfocus after clicking to prevent enter doing weird things
	(ev.target as HTMLButtonElement)?.blur();
}
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.keyboard {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;
}
.row {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}
.key {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	font-size: 24px;
	text-transform: uppercase;
	font-weight: $weight-bold;
	min-width: 45px;
	background-color: $bg-light;
	color: $content-light;
	border-radius: $border-radius;
	border: none;
	cursor: pointer;

	transition: all 0.25s ease;
	&:hover {
		background-color: $content-dark;
	}
	&:active {
		background-color: $content-mid;
	}
}

.key.includes {
	background-color: $caution-dark;
}

.key.exact {
	background-color: $accent-dark;
}

.key.empty {
	background-color: $fg-light;
}

@media screen and (max-width: $breakpoint-xs) {
	.row {
		width: 100%;
	}
	.key {
		min-width: auto;
		padding: 0.5rem 0;
		font-size: 5vw;
	}
}
</style>
