<script lang="ts">
	const punctuation: Record<string, string[]> = {
		",": [" 7w7,", " •w•,", " :3,"],
		".": [" uwu~", " owo~", "☆..", "~", "~"],
		"!": ["!!!", "!♡♡♡", "!! ^w^"],
		"?": ["?~", "?~ >w<", "? *:･ﾟ✧(ꈍᴗꈍ)✧･ﾟ:*"],
	};

	let input = "";
	$: output = input
		.replace(/l|r/g, "w")
		.replace(/(?<=n|m)(a|e|i|o|u)/g, (char) => `y${char}`) // ny and my
		.replace(/th/g, "d")
		// stutter
		.replace(/(?<=\s)\D/g, (char) =>
			Math.floor(Math.random() * 5) == 0 ? `${char}-${char}` : char,
		)
		// punctuation
		.replace(/\,|\.|\!|\?/g, (char) => punctuation[char][Math.floor(Math.random() * 5)] ?? char);
</script>

<div class="container all-center">
	<p class="tiny">I apologize in advance.</p>
	<br />
	<h1 class="headline">The UwUificator</h1>
	<input class="general-input" bind:value={input} />
	<p class="scroll">{output}</p>
</div>

<style lang="scss">
	.scroll {
		overflow: auto;
	}
</style>
