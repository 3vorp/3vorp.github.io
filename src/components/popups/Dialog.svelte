<!-- dialogs are non-persistent by default (modal) -->
<Overlay {open} onclickoff={() => persistent && handleClick(false)}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class={["dialog card", { open }]}
		style={`max-width: ${maxWidth}`}
		onclick={(e) => e.stopPropagation()}
		onkeydown={handleKey}
		tabindex="0"
		bind:this={ref}
	>
		{@render children(handleClick)}
	</div>
</Overlay>

<script lang="ts">
import type { Snippet } from "svelte";
import Overlay from "./Overlay.svelte";

let {
	children,
	open = $bindable(),
	persistent = true,
	maxWidth = "600px",
	oncancel = () => {},
	onconfirm = () => {},
}: {
	children: Snippet<[typeof handleClick]>;
	open: boolean;
	persistent?: boolean;
	maxWidth?: string;
	oncancel?: () => void;
	onconfirm?: () => void;
} = $props();

function handleClick(confirm: boolean) {
	open = false;
	return confirm ? onconfirm() : oncancel();
}

function handleKey(ev: KeyboardEvent) {
	switch (ev.key) {
		case "Escape":
			return handleClick(false);
		case "Enter":
			return handleClick(true);
	}
}

let ref: HTMLDivElement | undefined = $state();
$effect(() => {
	if (open) ref?.focus();
});
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.dialog {
	width: 100%;
	max-height: 80vh;
	// don't touch edges on small screens
	margin: $padding-container;
	overflow-y: auto;
}

.dialog.open {
	animation: open 0.25s;
}
</style>
