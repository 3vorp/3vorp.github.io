<div class="container all-center">
	<h1>The UwUificator</h1>
	<p class="caption text-center">I'm genuinely sorry for making this.</p>
	<textarea class="widget widget-textarea wide" bind:value={input} name="UwU Entry Box"></textarea>
	<br />
	<div class="card">
		<p class="output">{output}</p>
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

.wide {
	min-width: 75%;
}

.card {
	background-color: $fg-light;
	width: 75%;
	min-height: 5rem;
	padding: $padding-container;
	border-radius: $border-radius;
	overflow-wrap: break-word;
}

.output {
	margin-top: 0px;
	margin-bottom: 0px;
	text-align: left;
	// don't collapse newlines
	white-space: pre-wrap;
}
</style>
