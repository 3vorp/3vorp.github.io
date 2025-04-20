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

<nav class="edges">
	{#if isMobile}
		<div class="mobile-navbar">
			<a class="info-text link-hover" href="/">Evorp's Website</a>
			<button class="toggle info-text link-hover" onclick={() => (isOpen = !isOpen)}>
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
	nav {
		background-color: #131519;
		filter: drop-shadow(5px 5px 10px #00000077);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	a,
	.toggle {
		font-size: 24px;
	}

	.mobile-navbar {
		display: flex;
		flex-flow: row nowrap;
		padding: 20px 10%;
		justify-content: space-between;
	}

	@media screen and (min-width: 1200px) {
		.edges {
			padding-left: calc(20vw - 80px);
			padding-right: calc(20vw - 80px);
		}
	}

	@media screen and (min-width: 901px) {
		.navbar {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			padding: 20px 10%;
		}

		.toggle,
		.mobile-navbar {
			display: none;
		}
	}

	@media screen and (max-width: 900px) {
		.navbar {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			padding: 20px 10%;

			a {
				margin-bottom: 10px;
				height: 40px;
			}
		}

		.toggle {
			background-color: transparent;
			border: none;
			float: right;
		}
	}
</style>
