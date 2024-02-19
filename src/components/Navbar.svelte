<script lang="ts">
	import Fa from "svelte-fa";
	import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

	let innerWidth: number;
	let isOpen = false;
	let state = faBars;

	export let categories: Url[] = [];

	function toggleOpen() {
		isOpen = isOpen ? false : true;
		state = state == faX ? faBars : faX;
	}
</script>

<svelte:window bind:innerWidth />

<nav class="edges">
	{#if innerWidth <= 900}
		<div class="mobile-navbar">
			<a class="info-text link-hover" href="/">Evorp's Website</a>
			<button class="toggle info-text link-hover" on:click={toggleOpen}><Fa icon={state} /></button>
		</div>
	{/if}
	{#if isOpen || innerWidth > 900}
		<div class="navbar">
			{#each categories as obj}
				<a class="info-text link-hover" href={obj.url}>{obj.title}</a>
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
