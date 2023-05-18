<script>
    import Navbar from "../components/Navbar.svelte"
    import Footer from "../components/Footer.svelte"
    import "../css/main.scss";
</script>

<svelte:head>
    <title>Evorp's Website</title>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Evorp's Website" />
    <meta property="og:description" content="idk at this point either" />
    <meta property="og:image" content="https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg" />
</svelte:head>

<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:description" content="idk at this point either" />
<meta property="twitter:image" content="https://raw.githubusercontent.com/3vorp/3vorp.github.io/main/static/embed_banner.jpg" />

<div class="fix-footer">
    <Navbar />
    <slot />
    <Footer />
</div>

<style>
    .fix-footer {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        justify-content: space-between;
    }
</style>