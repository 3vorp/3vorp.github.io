<svelte:window bind:innerWidth />

<header>
	<nav>
		{#if isMobile}
			<div class="mobile-navbar">
				<a href="/" class="mobile-title navigation-link">Evorp's Website</a>
				<button
					class="mobile-navbar-toggle navigation-link"
					type="button"
					title={isOpen ? "Close Menu" : "Open Menu"}
					onclick={toggleOpen}
				>
					<Fa {icon} />
				</button>
			</div>
		{/if}
		<!-- always show if desktop layout -->
		{#if isOpen || !isMobile}
			<div class="navbar-item-container">
				{#each items as { href, title, icon } (title)}
					<a {href} class="navigation-link navbar-link" onclick={toggleOpen}>
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
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

import type { NavigationItem } from "./types";

const { items }: { items: NavigationItem[] } = $props();

let innerWidth = $state(0);
let isOpen = $state(false);

const icon = $derived(isOpen ? faClose : faBars);
const isMobile = $derived(innerWidth <= 760);

function toggleOpen() {
	if (!isMobile) return;
	isOpen = !isOpen;
}
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

// entire header must be sticky (otherwise the text moves without the background)
header {
	position: sticky;
	top: 0;
	z-index: 300;
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

.navbar-link,
.mobile-title,
.mobile-navbar-toggle {
	font-weight: $weight-bold;
	color: $content-light;
	font-size: $size-title-small;
}

.mobile-navbar-toggle {
	background-color: transparent;
	border: none;
	cursor: pointer;
}

.mobile-title {
	font-size: $size-title;
}

@media screen and (max-width: $breakpoint-lg) {
	// reduce margin calculation on side
	.navbar-item-container {
		justify-content: space-between;
	}
}

@media screen and (max-width: $breakpoint-sm) {
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
		padding: 0 10% $padding-container 10%;
		gap: 12px;
		height: auto;
	}

	.navbar-link {
		// now the page title (Evorp's Website) serves as the subtitle
		font-weight: $weight-semibold;
		font-size: $size-body;
		color: $content-mid;
	}
}
</style>
