<script lang="ts">
	const images: CommissionImage[] = [
		{ src: "skull.gif", alt: "skull" },
		{ src: "computer.png", alt: "computer" },
		{ src: "dragon.png", alt: "dragon" },
		{ src: "zombie.png", alt: "zombie" },
		{ src: "cat.gif", alt: "cat" },
	];
</script>

<img src="banner/commissions.jpg" alt="commission banner" class="banner-img" />

<div class="padding-div">
	<h1 align="center">Past Commissions</h1>
	<div class="img-container">
		{#each images as image}
			<div class="img-cell">
				<img src={`commission/${image.src}`} alt={image.alt || "commission image"} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.img-container {
		display: flex;
		flex-grow: 3;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
