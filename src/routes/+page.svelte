<h1 class="hero-container">
	<img src="banner/hero.jpg" alt="Evorp's Website" fetchpriority="high" class="hero-image" />
</h1>

<div class="container">
	<h2>Featured Projects</h2>
	<div class="grid-3-reel">
		{#each featuredProjects as { image, title, description, href, langs, frameworks } (title)}
			<a {href} class="card clickable-card" target="_blank" rel="noopener noreferrer">
				<div class="card-img-container">
					<img src={image} alt={`${title} icon`} class="card-img pa-4" />
				</div>
				<div class="card-body">
					<h3 class="my-0">{title}</h3>
					<small class="subtitle-container mt-2 mb-4">
						{#if langs}
							<div class="subtitle-container mr-2">
								<Fa icon={faCode} />
								{langs.join(", ")}
							</div>
						{/if}
						{#if frameworks}
							<div class="subtitle-container">
								<Fa icon={faLayerGroup} />
								{frameworks.join(", ")}
							</div>
						{/if}
					</small>
					<p class="text-preview my-0">{description}</p>
				</div>
			</a>
		{/each}
	</div>
	<br />

	<div class="cta-container">
		<a class="btn btn-more" href="/projects">
			See all projects <Fa icon={faChevronRight} size="xs" />
		</a>
	</div>
	<br /><br />

	<h2>Featured Artwork</h2>
	<div class="grid-3-reel">
		{#each featuredPortfolio as { src, alt, pad, title, date, description } (src)}
			<a class="card clickable-card" href={`/portfolio?show=${title}`}>
				<div class="card-img-container">
					<img src={`/portfolio/${src}`} {alt} class={["card-img", { "pa-4": pad }]} />
				</div>
				<div class="card-body">
					<h3 class="my-0">{title}</h3>
					<small class="subtitle-container mt-2 mb-4">
						<Fa icon={faCalendar} />
						{new Date(date).toLocaleString("en-us", { month: "short", year: "numeric" })}
					</small>
					<p class="text-preview my-0">{description}</p>
				</div>
			</a>
		{/each}
	</div>
	<br />
	<div class="cta-container">
		<a class="btn btn-more" href="/portfolio">
			See full portfolio <Fa icon={faChevronRight} size="xs" />
		</a>
	</div>
	<br /><br />
	<p class="text-center">
		<a href="/games/gamble">Gamble your savings away until I add more content to this site!</a>
	</p>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faCalendar,
	faChevronRight,
	faCode,
	faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import projects from "#data/projects.json";
import portfolio from "#data/portfolio.json";

const featuredProjects = projects.filter((p) => p.featured);
const featuredPortfolio = portfolio.filter((p) => p.featured);
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.hero-container {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
	margin: 0;
}

.hero-image {
	width: 100%;
	max-height: 50vw;
	-webkit-user-drag: none;
	-khtml-user-drag: none;
	-moz-user-drag: none;
	-o-user-drag: none;
	// specifically based on image margins, unique breakpoints are fine
	@media screen and (max-width: 1200px) {
		width: 130%;
	}
	@media screen and (max-width: 800px) {
		width: 160%;
	}
}

.subtitle-container {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 8px;
}

// https://css-tricks.com/line-clampin/
.text-preview {
	display: -webkit-box;
	overflow: hidden;
	line-clamp: 3;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

@media screen and (max-width: $breakpoint-md) {
	.text-preview {
		line-clamp: 2;
		-webkit-line-clamp: 2;
	}
}
</style>
