<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={["overlay", { open }]} onclick={() => handleClick(false)}>
	<div
		class="dialog"
		style={`max-width: ${maxWidth}px`}
		onclick={(e) => e.stopPropagation()}
		onkeydown={handleKey}
	>
		<div class="header">
			{#if title}
				<h2 class="h3 my-0">{title}</h2>
			{/if}
			<div class="spacer"></div>
			<button class="btn-icon" title="Close Dialog" onclick={() => handleClick(false)}>
				<Fa icon={faClose} size="lg" />
			</button>
		</div>
		{#if children}
			<div class="content">
				{@render children()}
			</div>
		{/if}
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
</div>

<script lang="ts">
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";

interface Action {
	text: string;
	primary?: true;
	destructive?: true;
}

let {
	open = $bindable(),
	title,
	actions,
	hideActions = false,
	destructive = false,
	oncancel = () => {},
	onconfirm = () => {},
	maxWidth = 600,
	children,
}: {
	open: boolean;
	title?: string;
	actions?: Action[];
	hideActions?: boolean;
	destructive?: boolean;
	maxWidth?: number;
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
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

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
}

.open .dialog {
	animation: open 0.25s;
}

.header {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	// don't justify space-between to prevent titleless modals breaking
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
