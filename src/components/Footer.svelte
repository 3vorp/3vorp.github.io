<script lang="ts">
    import Fa from "svelte-fa";
    export let categories: Url[] = [];
</script>

<footer>
    <div class="footer-bar">
        {#each categories as obj}
            <a class="info-text link-hover" target="_blank" rel="noopener noreferrer" href={obj.url}>
                <Fa icon={obj.icon} />
                {obj.title}
            </a>
        {/each}
    </div>
    <div class="bottom">
        <p class="info-text">
            This website was made using the <a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer">SvelteKit</a> framework. View the source <a href="https://github.com/3vorp/3vorp.github.io" target="_blank" rel="noopener noreferrer">here</a>!
        </p>
    </div>
</footer>

<style lang="scss">
    footer {
        background-color: #000;
        margin-top: 50px;
    }

    .footer-bar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        padding: 20px 10%;
        a {
            font-size: 18px;
        }
    }

    .footer-bar {
        @media screen and (max-width: 900px) {
            display: grid;
            grid-template-columns: 1fr 1fr; // two columns
            text-align: center;

            a {
                margin-top: 15px;
            }
        }

        @media screen and (max-width: 600px) {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 20px 10%;
        }
    }

    .bottom {
        text-align: center;
        transition: inherit; // cancels out the link hover

        a, p {
            font-size: 14px;
        }
    }
</style>
