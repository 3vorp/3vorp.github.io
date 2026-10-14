<div class="container">
	<h1>My Art Portfolio</h1>
	<p class="text-center caption">
		This list is not exhaustive—please contact me for further inquiries!
	</p>

	<h2>Wallpapers</h2>
	<div class="grid-2 mt-4">
		{#each wallpapers as { src, alt, title, date } (src)}
			<ArtCard
				image={`portfolio/wallpapers/${src}`}
				{alt}
				{title}
				date={new Date(date)}
				showDownload
			/>
		{/each}
	</div>
	<br /><br />

	<h2>Brand Design</h2>
	<div class="grid-3 mt-4">
		{#each branding as { src, alt, title, date } (src)}
			<ArtCard image={`portfolio/branding/${src}`} {alt} {title} date={new Date(date)} />
		{/each}
	</div>
	<br /><br />

	<h2>Profile Pictures</h2>
	<div class="grid-4 mt-4">
		{#each profiles as { src, alt, title, date } (src)}
			<ArtCard image={`portfolio/profiles/${src}`} {alt} {title} date={new Date(date)} />
		{/each}
	</div>
	<br /><br />

	<h2>Rendered Models</h2>
	<div class="grid-2 mt-4">
		{#each renders as { src, alt, title, date } (src)}
			<ArtCard image={`portfolio/renders/${src}`} {alt} {title} date={new Date(date)} />
		{/each}
	</div>
	<br /><br />

	<div class="cta-container">
		<h2>Looking for my programming work?</h2>
		<a href="/skills" class="widget btn btn-primary">Check out my recent projects</a>
	</div>
</div>

<script lang="ts">
import ArtCard from "#routes/portfolio/ArtCard.svelte";
import wallpapers from "#data/portfolio/wallpapers.json";
import profiles from "#data/portfolio/profiles.json";
import branding from "#data/portfolio/branding.json";
import renders from "#data/portfolio/renders.json";
</script>
