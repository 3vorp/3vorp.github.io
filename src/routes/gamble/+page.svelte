<script lang="ts">
	import { cards } from "./cards";
	import { randint, choice } from "../../helpers/random";

	const modes = ["numbers", "cards"];
	let rawIndex = $state(0);

	// iterate through types and looping back on complete
	const currentIndex = $derived(rawIndex % modes.length);
	const nextIndex = $derived((rawIndex + 1) % modes.length);

	let cardChoice = $state(choice(cards));
	let numberChoice = $state(randint(0, 100));

	const currentMode = $derived(modes[currentIndex]);
	const nextMode = $derived(modes[nextIndex]);
	const explanationText = $derived(
		currentMode === "cards" ? "pick a random card" : "pick a random number",
	);

	const generateRandomNumber = () => (numberChoice = randint(0, 100));
	const generateCard = () => (cardChoice = choice(cards));
</script>

<div class="container all-center">
	<p class="tiny">
		I do not take responsibility for any losses you may suffer as a result of this page.
	</p>
	<br />

	<h1>Gambling Simulator</h1>

	{#if currentMode === "numbers"}
		<button class="invisible h2 link-hover" onclick={generateRandomNumber}>
			Random number: {numberChoice}
		</button>
	{:else if currentMode === "cards"}
		<button class="invisible h2 link-hover" onclick={generateCard}>
			You drew a {cardChoice}
		</button>
	{/if}

	<p>
		Press the above text to {explanationText} and fund your gambling addiction!
	</p>

	<button class="general-button" onclick={() => void ++rawIndex}>
		Switch to {nextMode}
	</button>
</div>

<style lang="scss">
	@use "../../css/variables.scss" as *;
	p {
		margin-top: 50px;
		margin-bottom: 50px;
		font-size: 1.5em;
		font-weight: normal;
	}

	button {
		margin: 0 auto;
	}

	.invisible {
		border: none;
		background: transparent;
		font-weight: normal;
		color: $content-light;
	}
</style>
