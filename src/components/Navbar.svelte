<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faX, faBars } from '@fortawesome/free-solid-svg-icons';

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
        state = state == faX? faBars: faX;
    }
</script>

<svelte:window bind:innerWidth />

<nav>
    <button class="toggle" on:click={toggleOpen}><Fa icon={state}></Fa></button>
    {#if isOpen || innerWidth > 900}
        <div class="navbar">
            {#each categories as obj}
                <a href={obj.url}>{obj.title}</a>
            {/each}
        </div>
    {/if}
</nav>

<style>
    nav {
        background-color: #000;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    @media screen and (min-width: 900px) {
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
            height: 50px;
            width: 50px;
            border: 1.5px solid #dedede;
            font-size: 24px;
        }
        .navbar a {
            margin-bottom: 15px;
        }
    }

    .navbar a {
        font-family: "menlo", "consolas", monospace;
        font-size: 24px;
        color: #dedede;
    }

    .navbar a:hover {
        color: #4baeee;
    }
</style>
