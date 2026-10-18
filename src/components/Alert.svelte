<div class={["alert", type, { small }]}>
	{#if title}
		<h3 class="title my-0">
			<Fa {icon} class="mr-2" />
			{title}
		</h3>
	{/if}
	{#if children}
		<div class="description">
			{@render children()}
		</div>
	{/if}
</div>

<script lang="ts">
import type { Snippet } from "svelte";

import Fa from "svelte-fa";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

type AlertType = "info" | "danger";

const {
	type,
	title,
	children,
	small = false,
}: { type: AlertType; title?: string; children?: Snippet; small?: boolean } = $props();

const icon = $derived(type === "info" ? faCircleInfo : faCircleExclamation);
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.alert {
	display: flex;
	flex-flow: column nowrap;
	padding: $padding-container;
	border-radius: $border-radius;
	gap: 8px;
	background-color: $fg-light;
}

.title {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}

.alert.info {
	border-left: 4px solid $accent-mid;
	.description {
		color: $accent-light;
	}
}

.alert.danger {
	border-left: 4px solid $danger-mid;
	.description {
		color: $danger-light;
	}
}

.alert.small {
	.title {
		font-size: $size-title-small;
	}
	.description {
		font-size: $size-body-small;
	}
}
</style>
