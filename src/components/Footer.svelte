<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faGithub, faTwitter, faReddit, faYoutube, faSteam } from '@fortawesome/free-brands-svg-icons';

    const categories = [
        { title: "GitHub", url: "https://github.com/3vorp", icon: faGithub },
        { title: "Twitter", url: "https://twitter.com/3vorp", icon: faTwitter },
        { title: "Reddit", url: "https://reddit.com/u/3vorp", icon: faReddit },
        { title: "YouTube", url: "https://www.youtube.com/@evorp", icon: faYoutube },
        { title: "Steam", url: "https://steamcommunity.com/id/3vorp/", icon: faSteam },
    ]
</script>

<footer>
    <div class="footer-bar">
        {#each categories as obj}
            <a class="info-text" href={obj.url}>
                <Fa icon={obj.icon} /> {obj.title}
            </a>
        {/each}
    </div>
</footer>

<style>
    footer {
        background-color: #000;
        z-index: 10;
        margin-top: 50px;
    }

    @media screen and (min-width: 901px) {
        .footer-bar {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            padding: 20px 10%;
        }
    }

    @media screen and (max-width: 900px) {
        .footer-bar {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 20px 10%
        }
        .footer-bar a {
            margin-bottom: 15px;
        }
    }

    .footer-bar a {
        font-size: 18px;
    }
</style>