<div class="container all-center">
	<h1>The UwUificator</h1>
	<p class="caption">I'm genuinely sorry for making this.</p>

	<div class="card card-body block">
		<textarea
			class="text-field uwu-input"
			bind:value={input}
			name="UwU Entry Box"
			placeholder="Enter text to uwuify here…"></textarea>
		<p class="output mt-5 mb-0">
			{#if output}
				{output}
			{:else}
				<i>No input provided</i>
			{/if}
		</p>
	</div>
	<br />
	<div class="grid-2 block">
		<button class="btn block" disabled={!input} onclick={copyText}>
			<Fa icon={faCopy} /> Copy Text
		</button>
		<!-- don't use an anchor download so we can lazy load the blob data -->
		<button class="btn block" disabled={!input} onclick={downloadText}>
			<Fa icon={faDownload} /> Download Text
		</button>
	</div>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";

import uwuify from "./uwuify";
import { showSuccess } from "#helpers/snackbar.svelte.ts";

let input = $state("");
const output = $derived(uwuify(input));

function copyText() {
	navigator.clipboard.writeText(output);
	showSuccess("Copied text to clipboard!", "You should probably feel mildly ashamed right now.");
}

function downloadText() {
	const blob = new Blob([output]);
	const zipUrl = URL.createObjectURL(blob);
	const download = document.createElement("a");
	download.href = zipUrl;
	download.download = "uwuified.txt";
	download.click();
	showSuccess(
		"Downloaded text file!",
		"Should I even ask what you're using this for at this point?",
	);
}
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.uwu-input {
	min-height: 128px;
}

.output {
	// don't collapse newlines
	white-space: pre-line;
}
</style>
