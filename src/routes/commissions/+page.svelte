<script lang="ts">
	const images: CommissionImage[] = [
		{ src: "skull.gif", alt: "skull" },
		{ src: "cat.gif", alt: "cat" },
		{ src: "computer.png", alt: "computer" },
		{ src: "dragon.png", alt: "dragon" },
		{ src: "zombie.png", alt: "zombie" },
	];
</script>

<img src="banner/commissions.jpg" alt="commission banner" class="banner-img" />

<div class="container">
	<h1 class="center">Past Commissions</h1>
	<div class="img-container">
		{#each images as image}
			<img class="comm-img" src={`commission/${image.src}`} alt={image.alt || "commission image"} />
		{/each}
	</div>
</div>

<style lang="scss">
	.img-container {
		display: flex;
		flex-flow: row wrap;
		align-content: center;
		justify-content: center;
	}
	.comm-img {
		max-height: 20em;
		padding: 1em;
	}
</style>
