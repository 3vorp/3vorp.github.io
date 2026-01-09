<div class="container all-center">
	<h1>The UwUificator</h1>
	<textarea class="widget widget-textarea wide" bind:value={input}></textarea>
	<div class="card">
		<p class="output">{output}</p>
	</div>
	<br />
	<button class="widget btn my-3" onclick={copyText}>
		<Fa icon={faCopy} />&nbsp; Copy Text
	</button>
	<small class="mt-3">I apologize in advance.</small>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import uwuify from "./uwuify";

let input = $state("");
const output = $derived(uwuify(input));

function copyText() {
	navigator.clipboard.writeText(output);
	alert("Text copied!\n\n(I'm too lazy to add a proper tooltip for this)");
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
	white-space: pre-wrap;
}
</style>
