<script lang="ts">
    const randint = (start: number, stop: number) =>
        start + Math.floor(Math.random() * (stop - start));

    const choice = (arr: any[]) => arr[randint(0, arr.length - 1)];

    let selection = "numbers";
    let currentOption = "pick a random card";

    let cards: string[] = [];
    let tmp: string;
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

<p>
    I do not take responsibility for any losses you may suffer as a result of
    this page.
</p>
<br />

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

<button class="general-button" on:click={switchFormat}>
    Switch to {selection}
</button>

<style lang="scss">
    * {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-flow: column nowrap;
    }

    h1 {
        margin-top: 0px;
        margin-bottom: 50px;
        font-size: 4.5em;
        font-weight: bold;
    }

    h2 {
        margin-top: 50px;
        margin-bottom: 50px;
        font-size: 1.5em;
        font-weight: normal;
    }

    button {
        margin: 0 auto;
    }

    #invisible {
        font-size: 2.5em;
        border: none;
        background: transparent;
        border: none;
        color: #dedede;
    }

    p {
        font-size: 0.75em;
        position: relative;
    }
</style>
