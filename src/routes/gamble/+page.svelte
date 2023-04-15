<script>
    import "../../css/main.scss";
    const randint = (start, stop) =>
        start + Math.floor(Math.random() * (stop - start));

    let integer = 69; // nice
    function generateRandomNumber() {
        integer = randint(0, 100);
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
    <h1>Gambling Simulator</h1>
    <button on:click={generateRandomNumber}>
        Definitely random number: {integer}
    </button>
    <h2>
        Press the above text to generate a new number and fund your gambling
        addiction!
    </h2>
</div>
<div id="home">
    <hr>
    <h3>
        <a href="/">Return to Home Page</a>
    </h3>
</div>

<style>
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

    button {
        font-size: 2.5em;
        background: transparent;
        border: none;
        color: #dedede;
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
