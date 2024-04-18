<script lang="ts">
	const randint = (start: number, stop: number) =>
		start + Math.floor(Math.random() * (stop - start));

	const choice = (arr: any[]) => arr[randint(0, arr.length - 1)];

	const cards = ["clubs", "spades", "hearts", "diamonds"].reduce(
		(acc, suit) => {
			for (let i = 1; i <= 13; i++) {
				let tmp = i.toString();
				switch (i) {
					case 1:
						tmp = "ace";
						break;
					case 11:
						tmp = "jack";
						break;
					case 12:
						tmp = "queen";
						break;
					case 13:
						tmp = "king";
						break;
				}
				acc.push(`${tmp} of ${suit}`);
			}
			return acc;
		},
		// not included in suits
		["joker", "joker"],
	);

	let cardChoice = choice(cards);
	let rand = randint(0, 100);
	let selection = "numbers";
	let explanationText = "pick a random card";

	function generateRandomNumber() {
		rand = randint(0, 100);
	}

	function generateCard() {
		cardChoice = choice(cards);
	}

	function switchFormat() {
		explanationText = selection == "cards" ? "pick a random card" : "pick a random number";
		selection = selection == "cards" ? "numbers" : "cards";
	}
</script>

<p>I do not take responsibility for any losses you may suffer as a result of this page.</p>
<br />

<h1>Gambling Simulator</h1>

{#if selection == "cards"}
	<button id="invisible" on:click={generateRandomNumber}>
		Random number: {rand}
	</button>
{:else}
	<button id="invisible" on:click={generateCard}>
		You drew a {cardChoice}
	</button>
{/if}

<h2>
	Press the above text to {explanationText} and fund your gambling addiction!
</h2>

<button class="general-button" on:click={switchFormat}>
	Switch to {selection}
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
