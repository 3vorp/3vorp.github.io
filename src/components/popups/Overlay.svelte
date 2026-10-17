<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={["overlay", { open }]} onclick={() => onclickoff?.()}>
	{#if children}
		{@render children()}
	{/if}
</div>

<script lang="ts">
import type { Snippet } from "svelte";

const {
	open,
	onclickoff,
	children,
}: { open: boolean; children?: Snippet; onclickoff?: () => void } = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.overlay {
	visibility: hidden;
	opacity: 0;
	position: fixed;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	background: rgba($fg-dark, 0.8);
	z-index: 998;
	transition: opacity 0.25s ease;

	display: flex;
	align-items: center;
	justify-content: center;
}

.overlay.open {
	visibility: visible;
	opacity: 1;
}
</style>
