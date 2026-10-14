<!-- dialogs are non-persistent by default (modal) -->
<Overlay {open} onclickoff={() => persistent && handleClick(false)}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class={["dialog", { open }]}
		style={`max-width: ${maxWidth}`}
		onclick={(e) => e.stopPropagation()}
		onkeydown={handleKey}
		tabindex="0"
		bind:this={ref}
	>
		<button class="btn-icon close-icon" title="Close Dialog" onclick={() => handleClick(false)}>
			<Fa icon={faClose} size="lg" />
		</button>
		<div class="header">
			{#if title}
				<h2 class="h3 my-0">{title}</h2>
			{/if}
			{#if subtitle}
				<small>{subtitle}</small>
			{/if}
		</div>
		<div class="content">
			{@render children?.()}
		</div>
		{#if !hideActions}
			<div class="footer">
				{#each displayedActions as action (action.text)}
					<button
						class={[
							"widget",
							"btn",
							"btn-text",
							{ "btn-primary": action.primary, "btn-destructive": action.destructive },
						]}
						onclick={() => handleClick(action.primary || action.destructive || false)}
					>
						{action.text}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</Overlay>

<script lang="ts">
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";
import Overlay from "./Overlay.svelte";

interface Action {
	text: string;
	primary?: true;
	destructive?: true;
}

let {
	open = $bindable(),
	title,
	subtitle,
	actions,
	persistent = true,
	hideActions = false,
	destructive = false,
	oncancel = () => {},
	onconfirm = () => {},
	maxWidth = "600px",
	children,
}: {
	open: boolean;
	title?: string;
	subtitle?: string;
	actions?: Action[];
	persistent?: boolean;
	hideActions?: boolean;
	destructive?: boolean;
	maxWidth?: string;
	oncancel?: () => void;
	onconfirm?: () => void;
	children?: Snippet;
} = $props();

const displayedActions = $derived.by<Action[]>(() => {
	// prioritize overridden actions
	if (actions) return actions;
	if (!destructive) return [{ text: "Cancel" }, { text: "OK", primary: true }];
	return [{ text: "Cancel" }, { text: "Confirm", destructive: true }];
});

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
	background-color: $bg-mid;
	padding: $padding-container;
	border-radius: $border-radius;
	// don't touch edges on small screens
	margin: $padding-container;
	filter: drop-shadow($drop-shadow);
	display: flex;
	flex-flow: column nowrap;
	position: relative;
}

.dialog.open {
	animation: open 0.25s;
}

.close-icon {
	position: absolute;
	top: $padding-container;
	right: $padding-container;
}

.header {
	display: flex;
	flex-flow: column nowrap;
}

.content {
	flex-grow: 1;
	padding: $padding-container 0;
	overflow: hidden auto;
}

.footer {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: end;

	.btn {
		font-size: 16px;
		padding: 8px 16px;
		min-height: auto;
	}
}
</style>
