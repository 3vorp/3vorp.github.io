<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- HTML Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="theme-color" content="#a3bec7" />
	<link rel="icon" href="/favicon.png" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={banner} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={banner} />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<!-- this is really stupid but does work -->
	<link
		href="https://cdn.jsdelivr.net/gh/Overimagine1/old-discord-font/source.css"
		rel="stylesheet"
	/>

	<!-- basic analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-4S0HBS7SEE"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "G-4S0HBS7SEE");
	</script>
</svelte:head>

<div class="site-container">
	<Navbar
		items={[
			{ title: "Home", href: "/", icon: faHome },
			{ title: "Projects", href: "/projects", icon: faCode },
			{ title: "Portfolio", href: "/portfolio", icon: faPalette },
		]}
	/>
	<main bind:clientHeight class={["top-trim", { "full-trim": useFullBg }]}>
		{@render children()}
	</main>
	<Footer />
</div>

<!-- place out of main site flow to not mess with tab indexing -->
<div class="snackbar-container">
	{#each Object.entries(snackbars) as [id, snackbar] (id)}
		<Snackbar {...snackbar} ondestroy={() => popSnackbar(id)} />
	{/each}
</div>

<script lang="ts">
import "#css/main.scss";
import { faCode, faHome, faPalette } from "@fortawesome/free-solid-svg-icons";

import Navbar from "#components/navigation/Navbar.svelte";
import Footer from "#components/navigation/Footer.svelte";

import Snackbar from "#components/Snackbar.svelte";
import { popSnackbar, snackbars } from "#helpers/snackbar.svelte.ts";

const { children } = $props();

// shared meta tags
const title = "Evorp's Website";
const description = "idk at this point either";
const banner =
	"https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/banner/embed.jpg";

/** <main> has to be this many pixels tall to show both trims */
const MIN_MAIN_HEIGHT = 768;

let clientHeight = $state(0);
const useFullBg = $derived(clientHeight > MIN_MAIN_HEIGHT);
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

// make sure the entire screen is 100% height
.site-container {
	display: flex;
	min-height: 100vh;
	flex-flow: column nowrap;
	justify-content: space-between;
}

.snackbar-container {
	position: fixed;
	bottom: $padding-container;
	right: $padding-container;

	display: flex;
	flex-flow: column nowrap;
	align-items: end;
	gap: $padding-container;
	width: 100%;

	// otherwise width 100% makes the bottom of the screen unusable
	pointer-events: none;
}
</style>
