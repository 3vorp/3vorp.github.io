<script lang="ts">
	import Fa from "svelte-fa";
	import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

	const { items }: { items: Url[] } = $props();
	let innerWidth = $state(0);
	let isOpen = $state(false);
	const icon = $derived(isOpen ? faX : faBars);
	const isMobile = $derived(innerWidth <= 900);
</script>

<svelte:window bind:innerWidth />

<nav>
	{#if isMobile}
		<div class="mobile-navbar">
			<a class="info-text link-hover" href="/">Evorp's Website</a>
			<button class="mobile-navbar-toggle info-text link-hover" onclick={() => (isOpen = !isOpen)}>
				<Fa {icon} />
			</button>
		</div>
	{/if}
	<!-- always show if desktop layout -->
	{#if isOpen || !isMobile}
		<div class="navbar">
			{#each items as { href, title }}
				<a class="info-text link-hover" {href}>{title}</a>
			{/each}
		</div>
	{/if}
</nav>

<style lang="scss">
	@use "../css/variables.scss" as *;

	// entire header must be sticky (otherwise the text moves without the background)
	nav {
		position: sticky;
		background-color: $fg-dark;
		top: 0;
		z-index: 10;
		filter: drop-shadow($drop-shadow);
	}

	.info-text {
		font-size: 24px;
	}

	.mobile-navbar-toggle {
		background-color: transparent;
		border: none;
		&:hover {
			cursor: pointer;
		}
	}

	.navbar {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
		padding: 20px 10%;
	}

	.mobile-navbar {
		display: none;
	}

	@media screen and (max-width: 900px) {
		// show mobile navbar
		.mobile-navbar {
			display: flex;
			flex-flow: row nowrap;
			padding: 20px 10%;
			justify-content: space-between;
		}

		// main navbar becomes dropdown
		.navbar {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			padding: 20px 10%;

			a {
				margin-bottom: 10px;
				height: 40px;
			}
		}
	}
</style>
