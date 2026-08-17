<div class="main-banner">
	<img src="banner/hero.jpg" alt="Evorp's Website" fetchpriority="high" />
</div>

{#each Object.entries(projects) as [key, category]}
	<h1 class="container text-center">{key}</h1>
	{#each category as { title, description, href, image, langs, frameworks }, i}
		<div class={i % 2 === 0 ? "" : "secondary-background"}>
			<div class="container project-container">
				<div class="project-info">
					<a class="h2" {href} target="_blank" rel="noopener noreferrer">
						{title}
					</a>
					<p class="project-description">{description}</p>
					<ul>
						{#if langs}
							<li>Languages: {langs.join(", ")}</li>
						{/if}
						{#if frameworks}
							<li>Frameworks: {frameworks.join(", ")}</li>
						{/if}
					</ul>
				</div>
				<a {href} target="_blank" rel="noopener noreferrer">
					<img class="project-image" src={image} alt={`${title} logo`} width="256" loading="lazy" />
				</a>
			</div>
		</div>
	{/each}
{/each}

<p class="container text-center pt-0">
	<a href="/gamble">Gamble your savings away until I add more content to this site!</a>
</p>

<script lang="ts">
import projects from "../data/projects.json";
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.main-banner {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
	img {
		max-width: 100%;
		max-height: 50vw;
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		@media screen and (max-width: 1200px) {
			max-width: 130%;
		}
		@media screen and (max-width: 800px) {
			max-width: 160%;
		}
	}
}
// override container class for flex content
.project-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 32px 16px;
	gap: 40px;

	@media screen and (max-width: 576px) {
		// center content and display vertically on mobile
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
}

@media screen and (max-width: 576px) {
	.project-description {
		margin-left: 30px;
		margin-right: 30px;
	}
}

.project-image {
	filter: drop-shadow($drop-shadow);
	transition: all 0.5s ease;
	&:hover {
		transform: scale(1.1);
	}
}

.secondary-background {
	background: $bg-mid;
}
</style>
