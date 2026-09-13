<div class={["snackbar", type]}>
	<h3 class="title my-0">
		<Fa {icon} class="mr-2" />
		{title}
		<div class="spacer"></div>
		<button class="btn-icon" onclick={ondestroy}>
			<Fa icon={faClose} size="lg" />
		</button>
	</h3>
	{#if description}
		<p class="description my-1">{description}</p>
	{/if}
</div>

<script lang="ts">
import { faCancel, faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { onMount } from "svelte";
import Fa from "svelte-fa";
import type { Snackbar } from "~/helpers/snackbar.svelte";

const {
	title,
	description,
	type,
	delay,
	ondestroy = () => {},
}: Snackbar & { ondestroy: () => void } = $props();

const icon = $derived(type === "success" ? faCheck : faCancel);

onMount(() => {
	// have to cancel with x with persistent
	if (delay !== -1) setTimeout(ondestroy, delay || 3000);
});
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.snackbar {
	padding: calc($padding-container / 2) $padding-container;
	border-radius: $border-radius;
	background: $fg-light;
	width: 384px;
	filter: drop-shadow($drop-shadow);
	animation: open 0.25s;
}

.title {
	font-size: 20px;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: start;
}

.description {
	font-size: 16px;
}

.snackbar.success {
	border-left: 4px solid $accent-mid;
	.description {
		color: $accent-light;
	}
}

.snackbar.error {
	border-left: 4px solid $danger-mid;
	.description {
		color: $danger-light;
	}
}

@media screen and (max-width: $breakpoint-xs) {
	.snackbar {
		// remove two padding containers for the left and right sides
		width: calc(100% - $padding-container * 2);
	}
}
</style>
