<div class="container">
	<h1>My Portfolio</h1>
	<p class="text-center caption">
		A non-exhaustive list of artwork I've made over the past 4+ years.
	</p>

	{#each Object.entries(portfolio) as [category, items] (category)}
		<h2>{category}</h2>
		<div class={`grid-${items.length > 4 ? 3 : items.length} mt-4`}>
			{#each items as { src, alt, title, date } (src)}
				<ArtCard
					image={`portfolio/${src}`}
					{alt}
					{title}
					date={new Date(date)}
					showDownload={category === "Wallpapers"}
				/>
			{/each}
		</div>
		<br /><br />
	{/each}

	<div class="cta-container">
		<h2>Looking for my programming work?</h2>
		<a href="/skills" class="widget btn btn-primary">Check out my recent projects</a>
	</div>
</div>

<script lang="ts">
import ArtCard from "#routes/portfolio/ArtCard.svelte";
import portfolio from "#data/portfolio.json";
</script>
