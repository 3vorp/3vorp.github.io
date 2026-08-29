<div class="alert">
	<Fa icon={faWarning} size="1.5x" class="my-1" />
	<div>
		{@render children()}
	</div>
</div>

<script lang="ts">
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";

const { children }: { children: Snippet } = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.alert {
	display: flex;
	flex-flow: row nowrap;
	gap: 16px;
	padding: $padding-container;
	background-color: rgba($danger-dark, 0.1);
	border-radius: $border-radius;
}

:global(.alert p) {
	color: $danger-dark;
}

:global(.alert :not(p)) {
	color: $danger-light;
}
</style>
