<svelte:window bind:innerWidth />

<div class="alert">
	{#if !isMobile}
		<Fa icon={faWarning} size="3x" />
	{/if}
	{@render children()}
</div>

<script lang="ts">
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import type { Snippet } from "svelte";
import Fa from "svelte-fa";

let { children }: { children: Snippet } = $props();
let innerWidth = $state(0);
const isMobile = $derived(innerWidth <= 760);
</script>

<style lang="scss">
.alert {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 16px;
	padding: 16px;
	background-color: rgba(#f04747, 0.1);
	color: #f04747;
	border-radius: 4px;
}
</style>
