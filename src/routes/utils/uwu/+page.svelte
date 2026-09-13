<div class="container all-center">
	<h1>The UwUificator</h1>
	<p class="caption text-center">I'm genuinely sorry for making this.</p>

	<div class="card">
		<textarea class="widget text-field" style="width: 100%;" bind:value={input} name="UwU Entry Box"
		></textarea>
		<p class="output mt-5 mb-0">
			{#if output}
				{output}
			{:else}
				<i>No input provided</i>
			{/if}
		</p>
	</div>
	<br />
	<button class="widget btn my-3" onclick={copyText}>
		<Fa icon={faCopy} /> Copy Text
	</button>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import uwuify from "./uwuify";

let input = $state("");
const output = $derived(uwuify(input));

function copyText() {
	navigator.clipboard.writeText(output);
	alert("Copied text to clipboard!)");
}
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.card {
	background-color: $bg-light;
	color: $content-light;
	width: 75%;
	min-height: 5rem;
	padding: $padding-container;
	border-radius: $border-radius;
	overflow-wrap: break-word;
	filter: drop-shadow($drop-shadow);
}

.output {
	text-align: left;
	// don't collapse newlines
	white-space: pre-line;
}
</style>
