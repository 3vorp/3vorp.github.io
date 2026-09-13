<div class={["alert", type]}>
	{#if title}
		<h3 class="title my-0">
			<Fa {icon} class="mr-2" />
			{title}
		</h3>
	{/if}
	<div class="description">
		{@render children()}
	</div>
</div>

<script lang="ts">
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";

type AlertType = "info" | "danger";

const { type, title, children }: { type: AlertType; title?: string; children: Snippet } = $props();

const icon = $derived(type === "info" ? faCircleInfo : faCircleExclamation);
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

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
</style>
