<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

    let innerWidth = 0;
    let isOpen = false;
    let state = faBars;

    const categories = [
        { title: "Home", url: "/" },
        { title: "Faithful", url: "/faithful" },
        { title: "spunch bot", url: "/spunch-bot" },
        { title: "Commissions", url: "/commissions" },
        { title: "Gamble", url: "/gamble" },
    ];

    function toggleOpen() {
        isOpen = isOpen ? false : true;
        state = state == faX ? faBars : faX;
    }
</script>

<svelte:window bind:innerWidth />

<nav>
    <button class="toggle" on:click={toggleOpen}><Fa icon={state} /></button>
    {#if isOpen || innerWidth > 900}
        <div class="navbar">
            {#each categories as obj}
                <a class="info-text" href={obj.url}>{obj.title}</a>
            {/each}
        </div>
    {/if}
</nav>

<style>
    nav {
        background-color: #000;
        filter: drop-shadow(5px 5px 10px #00000077);
        position: sticky;
        top: 0;
        z-index: 10;
    }

    @media screen and (min-width: 901px) {
        .navbar {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            padding: 20px 10%;
        }
        .toggle {
            display: none;
        }
    }

    @media screen and (max-width: 900px) {
        .navbar {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 20px 10%;
        }
        .toggle {
            background-color: #000;
            border-radius: 7px;
            color: inherit;
            height: 40px;
            width: 40px;
            border: 1.5px solid #dedede;
            font-size: 26px;
            margin: 12px 12px 12px 12px;
        }
        .toggle:hover {
            border: 1.5px solid #4baeee;
            color: #4baeee;
        }
        .navbar a {
            margin-bottom: 15px;
        }
    }

    .navbar a {
        font-size: 24px;
    }

</style>
