<script>
    import "../../css/main.scss";
    const randint = (start, stop) =>
        start + Math.floor(Math.random() * (stop - start));

    const choice = (arr) => arr[randint(0, arr.length - 1)];

    let selection = "numbers";
    let currentOption = "pick a random number";

    let cards = [];
    let tmp;
    const suits = ["clubs", "spades", "hearts", "diamonds"];

    for (let j of suits) {
        for (let i = 1; i < 13; i++) {
            switch (i) {
                case 1:
                    tmp = "ace";
                    break;
                case 11:
                    tmp = "jack";
                    break;
                case 12:
                    tmp = "queen";
                    break;
                case 13:
                    tmp = "king";
                    break;
                default:
                    tmp = i.toString();
                    break;
            }
            cards.push(`${tmp} of ${j}`);
        }
    }

    let cardChoice = choice(cards);
    let integer = randint(0, 100);

    function generateRandomNumber() {
        integer = randint(0, 100);
    }

    function generateCard() {
        cardChoice = choice(cards);
    }

    function switchFormat() {
        selection = selection == "cards" ? "numbers" : "cards";

        currentOption =
            currentOption == "pick a random number"
                ? "pick a random card"
                : "pick a random number";
    }
</script>

<svelte:head>
    <title>Evorp's Website</title>
</svelte:head>

<p>
    I do not take responsibility for any losses you may suffer as a result of
    this page.
</p>
<div id="wrapper">
    <button id="switcher" on:click={switchFormat}>
        Switch to {selection}
    </button>
    <br /><br />
    <h1>Gambling Simulator</h1>
    {#if selection == "cards"}
        <button id="invisible" on:click={generateRandomNumber}>
            Definitely random number: {integer}
        </button>
    {:else}
        <button id="invisible" on:click={generateCard}>
            You drew a {cardChoice}
        </button>
    {/if}
    <h2>
        Press the above text to {currentOption} and fund your gambling addiction!
    </h2>
</div>
<div id="home">
    <hr />
    <h3>
        <a href="/">Return to Home Page</a>
    </h3>
</div>

<style lang="scss">
    * {
        text-align: center;
    }

    h1 {
        margin-top: 0px;
        margin-bottom: 50px;
        font-size: 4.5em;
        font-weight: bold;
    }

    h2 {
        margin-top: 50px;
        margin-bottom: 0px;
        font-size: 1.5em;
        font-weight: normal;
    }

    h3 {
        font-weight: lighter;
        font-size: 1.5em;
    }

    #invisible {
        font-size: 2.5em;
        border: none;
        background: transparent;
        border: none;
        color: #dedede;
    }

    #switcher {
        color: #dedede;
        background-color: #4a4a5e;
        border-radius: 10px;
        font-size: 1.75em;
        border: none;
    }

    p {
        font-size: 0.75em;
        position: relative;
    }

    #wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    #home {
        position: absolute;
        top: 90%;
        left: 50%;
        -webkit-transform: translate(-50%, -10%);
        transform: translate(-50%, -10%);
    }
</style>
