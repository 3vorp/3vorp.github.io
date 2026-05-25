<svelte:window bind:innerWidth />

<header>
	<nav>
		{#if isMobile}
			<div class="mobile-navbar">
				<a class="mobile-title navigation-link" href="/">Evorp's Website</a>
				<button
					class="mobile-navbar-toggle navigation-link"
					type="button"
					title={isOpen ? "Close Menu" : "Open Menu"}
					onclick={() => (isOpen = !isOpen)}
				>
					<Fa {icon} />
				</button>
			</div>
		{/if}
		<!-- always show if desktop layout -->
		{#if isOpen || !isMobile}
			<div class="navbar-item-container">
				{#each items as { href, title, icon }}
					<a class="navigation-link navbar-link" {href}>
						<Fa {icon} class="mr-2" />
						{title}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</header>

<script lang="ts">
import Fa from "svelte-fa";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

const { items }: { items: Url[] } = $props();
let innerWidth = $state(0);
let isOpen = $state(false);
const icon = $derived(isOpen ? faX : faBars);
const isMobile = $derived(innerWidth <= 900);
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

// entire header must be sticky (otherwise the text moves without the background)
header {
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: $fg-dark;
	filter: drop-shadow($drop-shadow);
}

.navbar-item-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-evenly;
	align-items: center;
	padding: 0 10%;
	height: 64px;
}

.mobile-navbar {
	display: none;
}

.mobile-navbar-toggle {
	background-color: transparent;
	border: none;
	&:hover {
		cursor: pointer;
	}
}

.mobile-title {
	font-size: 24px;
}

@media screen and (max-width: 900px) {
	// show mobile navbar
	.mobile-navbar {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		height: 64px;
		padding: 0 10%;
	}

	// main navbar becomes dropdown
	.navbar-item-container {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: start;
		padding: 10px 10%;
		height: auto;
	}

	.navbar-link {
		// now the page title (Evorp's Website) serves as the subtitle
		font-family: $font-body;
		color: $content-mid;
		margin-bottom: 16px;
	}
}
</style>
