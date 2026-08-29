<div class="tooltip-container">
	<span class="tooltip-hitbox">{@render children()}</span>
	<span class="tooltip" role="tooltip">{@render tooltip()}</span>
</div>

<script lang="ts">
import type { Snippet } from "svelte";

let { tooltip, children }: { tooltip: Snippet; children: Snippet } = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.tooltip-container {
	position: relative;
	// https://stackoverflow.com/a/34062947/20327257 cool trick
	pointer-events: none;
}

.tooltip-hitbox {
	pointer-events: all;
	cursor: help;
}

.tooltip {
	opacity: 0;
	// mediocre centering attempt
	position: absolute;
	left: 50%;
	transform: translate(-50%, 100%);

	padding: 4px 8px;
	background-color: $fg-dark;
	border-radius: $border-radius;
	color: $content-light;
	font-weight: $weight-semibold;

	transition: all 0.25s ease;
}

.tooltip-container:hover .tooltip,
.tooltip-container:focus .tooltip {
	opacity: 1;
}
</style>
