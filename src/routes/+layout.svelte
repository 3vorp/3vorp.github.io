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

	const navbarCategories = [
		{ title: "Home", url: "/" },
		{ title: "Projects", url: "/projects" },
		{ title: "Commissions", url: "/commissions" },
		{ title: "About", url: "/about" },
	];

	const footerCategories = [
		{ title: "GitHub", url: "https://github.com/3vorp", icon: faGithub },
		{ title: "Twitter", url: "https://twitter.com/3vorp", icon: faTwitter },
		{ title: "Reddit", url: "https://reddit.com/u/3vorp", icon: faReddit },
		{ title: "Tumblr", url: "https://tumblr.com/evorp", icon: faTumblr },
		{ title: "YouTube", url: "https://www.youtube.com/@evorp", icon: faYoutube },
		{ title: "Steam", url: "https://steamcommunity.com/id/3vorp/", icon: faSteam },
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

<div class="fix-footer">
	<Navbar categories={navbarCategories} />
	<slot />
	<Footer categories={footerCategories} />
</div>

<style lang="scss">
	.fix-footer {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		justify-content: space-between;
	}
	:root {
		color-scheme: dark;
	}
</style>
