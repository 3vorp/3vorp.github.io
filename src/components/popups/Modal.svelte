<Dialog bind:open {...args}>
	{#snippet children(handleClick)}
		<button class="btn-icon close-icon" title="Close Dialog" onclick={() => handleClick(false)}>
			<Fa icon={faClose} size="lg" />
		</button>
		<div class="card-body">
			<div class="header">
				{#if title}
					<h2 class="h3 my-0">{title}</h2>
				{/if}
				{#if subtitle}
					<small>{subtitle}</small>
				{/if}
			</div>
			<div class="content">
				{@render modalChildren?.()}
			</div>
			{#if !hideActions}
				<div class="footer">
					{#each displayedActions as action (action.text)}
						<button
							class={[
								"btn btn-text",
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
	{/snippet}
</Dialog>

<script lang="ts">
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Dialog from "./Dialog.svelte";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";

interface Action {
	text: string;
	primary?: true;
	destructive?: true;
}

let {
	open = $bindable(),
	children: modalChildren,
	title,
	subtitle,
	actions,
	hideActions = false,
	destructive = false,
	...args
}: {
	open: boolean;
	children?: Snippet;
	title?: string;
	subtitle?: string;
	actions?: Action[];
	persistent?: boolean;
	hideActions?: boolean;
	destructive?: boolean;
	maxWidth?: string;
	oncancel?: () => void;
	onconfirm?: () => void;
} = $props();

const displayedActions = $derived.by<Action[]>(() => {
	// prioritize overridden actions
	if (actions) return actions;
	if (destructive) return [{ text: "Cancel" }, { text: "Confirm", destructive: true }];
	return [{ text: "Cancel" }, { text: "OK", primary: true }];
});
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

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
