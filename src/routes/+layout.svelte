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

	// shared meta tags
	const title = "Evorp's Website";
	const description = "idk at this point either";
	const banner =
		"https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg";
</script>

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
</svelte:head>

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
</style>
