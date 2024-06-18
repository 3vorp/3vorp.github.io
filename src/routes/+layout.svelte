<script lang="ts">
	import Navbar from "../components/Navbar.svelte";
	import Footer from "../components/Footer.svelte";
	import {
		faGithub,
		faTwitter,
		faReddit,
		faTumblr,
		faYoutube,
		faSteam,
	} from "@fortawesome/free-brands-svg-icons";
	import "../css/main.scss";

	const navItems: Url[] = [
		{ title: "Home", href: "/" },
		{ title: "Commissions", href: "/commissions" },
		{ title: "Projects", href: "/projects" },
		{ title: "About", href: "/about" },
	];

	const footerItems: Required<Url>[] = [
		{ title: "GitHub", href: "https://github.com/3vorp", icon: faGithub },
		{ title: "Twitter", href: "https://twitter.com/3vorp", icon: faTwitter },
		{ title: "Reddit", href: "https://reddit.com/u/3vorp", icon: faReddit },
		{ title: "Tumblr", href: "https://tumblr.com/evorp", icon: faTumblr },
		{ title: "YouTube", href: "https://www.youtube.com/@evorp", icon: faYoutube },
		{ title: "Steam", href: "https://steamcommunity.com/id/3vorp/", icon: faSteam },
	];
</script>

<svelte:head>
	<title>Evorp's Website</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Evorp's Website" />
	<meta property="og:description" content="idk at this point either" />
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg"
	/>
</svelte:head>

<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:description" content="idk at this point either" />
<meta
	property="twitter:image"
	content="https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg"
/>

<div class="site-container">
	<Navbar items={navItems} />
	<slot />
	<Footer items={footerItems} />
</div>

<style lang="scss">
	// make sure the entire screen is 100% height
	.site-container {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		justify-content: space-between;
	}

	// dark scrollbar hack
	:root {
		color-scheme: dark;
	}
</style>
