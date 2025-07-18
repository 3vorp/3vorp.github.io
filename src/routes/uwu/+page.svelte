<script lang="ts">
	const punctuation: Record<string, string[]> = {
		",": [" 7w7,", " •w•,", " :3,"],
		".": [" uwu~", " owo~", "☆..", "~", "~"],
		"!": ["!!!", "!♡♡♡", "!! ^w^"],
		"?": ["?~", "?~ >w<", "? *:･ﾟ✧(ꈍᴗꈍ)✧･ﾟ:*"],
	};

	let input = $state("");
	const output = $derived(
		input
			.toLocaleLowerCase()
			.replace(/l|r/g, "w")
			.replace(/(?<=n|m)(a|e|i|o|u)/g, (char) => `y${char}`) // ny and my
			.replace(/th/g, "d")
			// stutter
			.replace(/(?<=\s)\D/g, (char) =>
				Math.floor(Math.random() * 5) == 0 ? `${char}-${char}` : char,
			)
			// punctuation
			.replace(/\,|\.|\!|\?/g, (char) => punctuation[char][Math.floor(Math.random() * 5)] ?? char),
	);
</script>

<div class="container all-center">
	<p class="tiny">I apologize in advance.</p>
	<br />
	<h1>The UwUificator</h1>
	<textarea class="general-input wide" bind:value={input}></textarea>
	<div class="card">
		<p class="output">{output}</p>
	</div>
</div>

<style lang="scss">
	@use "../../css/variables.scss" as *;

	.wide {
		min-width: 75%;
	}

	.card {
		background-color: $fg-light;
		width: 75%;
		min-height: 5rem;
		margin-top: 2rem;
		padding: 16px;
		border-radius: 4px;
		overflow-wrap: break-word;
	}

	.output {
		margin-top: 0px;
		margin-bottom: 0px;
		text-align: left;
		// don't collapse newlines
		white-space: pre;
	}
</style>
