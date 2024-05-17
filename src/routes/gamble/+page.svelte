<script lang="ts">
	const randint = (start: number, stop: number) =>
		start + Math.floor(Math.random() * (stop - start));

	const choice = <T,>(arr: T[]): T => arr[randint(0, arr.length - 1)];

	const cards = ["clubs", "spades", "hearts", "diamonds"].reduce(
		(acc, suit) => {
			for (let i = 1; i <= 13; i++) {
				let num = i.toString();
				switch (i) {
					case 1:
						num = "ace";
						break;
					case 11:
						num = "jack";
						break;
					case 12:
						num = "queen";
						break;
					case 13:
						num = "king";
						break;
				}
				acc.push(`${num} of ${suit}`);
			}
			return acc;
		},
		// not included in suits
		["joker", "joker"],
	);

	const modes = ["numbers", "cards"];
	let currentIndex = 0;

	// iterate through types and looping back on complete
	$: currentMode = modes[currentIndex % modes.length];
	$: nextMode = modes[(currentIndex + 1) % modes.length];
	$: explanationText = currentMode === "cards" ? "pick a random card" : "pack a random number";

	let cardChoice = choice(cards);
	let numberChoice = randint(0, 100);

	function generateRandomNumber() {
		numberChoice = randint(0, 100);
	}

	function generateCard() {
		cardChoice = choice(cards);
	}

	function nextFormat() {
		++currentIndex;
	}
</script>

<p>I do not take responsibility for any losses you may suffer as a result of this page.</p>
<br />

<h1>Gambling Simulator</h1>

{#if currentMode === "numbers"}
	<button id="invisible" on:click={generateRandomNumber}>
		Random number: {numberChoice}
	</button>
{:else if currentMode === "cards"}
	<button id="invisible" on:click={generateCard}>
		You drew a {cardChoice}
	</button>
{/if}

<h2>
	Press the above text to {explanationText} and fund your gambling addiction!
</h2>

<button class="general-button" on:click={nextFormat}>
	Switch to {nextMode}
</button>

<style lang="scss">
	* {
		display: flex;
		justify-content: center;
		text-align: center;
		flex-flow: column nowrap;
	}

	h1 {
		margin-top: 0px;
		margin-bottom: 50px;
		font-size: 4.5em;
		font-weight: bold;
	}

	h2 {
		margin-top: 50px;
		margin-bottom: 50px;
		font-size: 1.5em;
		font-weight: normal;
	}

	button {
		margin: 0 auto;
	}

	#invisible {
		font-size: 2.5em;
		border: none;
		background: transparent;
		border: none;
		color: #dedede;
	}

	p {
		font-size: 0.75em;
		position: relative;
	}
</style>
