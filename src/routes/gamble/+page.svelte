<div class="container all-center">
	<small>
		I do not take responsibility for any losses you may suffer as a result of this page.
	</small>
	<br />

	<h1>Gambling Simulator</h1>

	{#if cycler.current === "numbers"}
		<button class="invisible h2 link-hover" onclick={generateRandomNumber}>
			Random number: {numberChoice}
		</button>
	{:else if cycler.current === "cards"}
		<button class="invisible h2 link-hover" onclick={generateCard}>
			You drew a {cardChoice}
		</button>
	{/if}

	<p class="explain">
		Press the above text to {explanationText} and fund your gambling addiction!
	</p>

	<button class="widget widget-btn" onclick={cycler.cycle}>
		Switch to {cycler.next}
	</button>
</div>

<script lang="ts">
import { cards } from "./cards";
import { randint, choice } from "../../helpers/random";
import { makeCycler } from "./cycler.svelte";

const modes = ["numbers", "cards"];

let cardChoice = $state(choice(cards));
let numberChoice = $state(randint(0, 100));

const generateRandomNumber = () => (numberChoice = randint(0, 100));
const generateCard = () => (cardChoice = choice(cards));

const cycler = makeCycler(modes);

const explanationText = $derived(
	cycler.current === "cards" ? "pick a random card" : "pick a random number",
);
</script>

<style lang="scss">
@use "../../css/variables.scss" as *;
.explain {
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
	&:hover {
		cursor: pointer;
		color: $accent-light;
	}
}
</style>
