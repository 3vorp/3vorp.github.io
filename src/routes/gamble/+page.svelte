<div class="container all-center">
	<h1>Gambling Simulator</h1>
	<h2>
		{#if cycler.current === "numbers"}
			Random number: {numberChoice}
		{:else if cycler.current === "cards"}
			You drew a {cardChoice}
		{/if}
	</h2>
	<div class="button-row my-3">
		<button bind:this={generateBtn} class="widget btn btn-primary" onclick={regenerate}>
			<Fa icon={faRotateRight} />&nbsp; Try Again
		</button>
		<button class="widget btn" onclick={cycler.cycle}>
			<Fa icon={faRepeat} />&nbsp; Switch to {cycler.next}
		</button>
	</div>

	<small class="mt-3">
		I do not take responsibility for any losses you may suffer as a result of this page.
	</small>
</div>

<script lang="ts">
import { onMount } from "svelte";

import Fa from "svelte-fa";
import { faRotateRight, faRepeat } from "@fortawesome/free-solid-svg-icons";

import { randint, choice } from "~/helpers/random";
import { makeCycler } from "~/helpers/cycler.svelte";
import cards from "./cards";

const modes = ["numbers", "cards"];

let cardChoice = $state(choice(cards));
let numberChoice = $state(randint(0, 100));

const cycler = makeCycler(modes);
function regenerate() {
	switch (cycler.current) {
		case "numbers":
			numberChoice = randint(0, 100);
			break;
		case "cards":
			cardChoice = choice(cards);
			break;
	}
}

let generateBtn: HTMLButtonElement;
onMount(() => generateBtn.focus());
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.button-row {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 1rem;
}
</style>
