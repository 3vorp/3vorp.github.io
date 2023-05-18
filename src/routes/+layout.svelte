<script>
    import Navbar from "../components/Navbar.svelte"
    import Footer from "../components/Footer.svelte"
    import "../css/main.scss";
</script>

<svelte:head>
    <title>Evorp's Website</title>
</svelte:head>

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