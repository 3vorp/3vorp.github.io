<script lang="ts">
	import Fa from "svelte-fa";
	import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

	export let categories: Url[] = [];

	let innerWidth: number;
	let isOpen = false;
	$: iconState = isOpen ? faX : faBars;
	$: isMobile = innerWidth <= 900;

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<svelte:window bind:innerWidth />

<nav class="edges">
	{#if isMobile}
		<div class="mobile-navbar">
			<a class="info-text link-hover" href="/">Evorp's Website</a>
			<button class="toggle info-text link-hover" on:click={toggleOpen}>
				<Fa icon={iconState} />
			</button>
		</div>
	{/if}
	<!-- always show if desktop layout -->
	{#if isOpen || !isMobile}
		<div class="navbar">
			{#each categories as category}
				<a class="info-text link-hover" href={category.url}>{category.title}</a>
			{/each}
		</div>
	{/if}
</nav>

<style lang="scss">
	nav {
		background-color: #000;
		filter: drop-shadow(5px 5px 10px #00000077);
		position: sticky;
		top: 0;
		z-index: 10;
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

	a,
	.toggle {
		font-size: 24px;
	}
</style>
