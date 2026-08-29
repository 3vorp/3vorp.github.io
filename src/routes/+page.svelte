<svelte:window bind:innerWidth />

<div class="main-banner">
	<img src="banner/hero.jpg" alt="Evorp's Website" fetchpriority="high" />
</div>

{#each Object.entries(projects) as [key, category]}
	<h1 class="container text-center">{key}</h1>
	{#each category as { title, description, href, image, langs, frameworks }, i}
		<div class={i % 2 === 0 ? "" : "secondary-background"}>
			<div class="container project-container">
				<div class="project-info">
					<div class="project-header">
						{#if isMobile}
							<img class="project-image" src={image} alt={`${title} icon`} width="96" />
						{/if}
						<div>
							<a class={isMobile ? "h3" : "h2"} {href} target="_blank" rel="noopener noreferrer">
								{title}
							</a>
							<div class="skill-container">
								{#if langs?.length}
									<div class="chip-container mr-2">
										<Tooltip>
											<Fa icon={faCode} />
											{#snippet tooltip()}Languages{/snippet}
										</Tooltip>
										{#each langs || [] as lang}
											<a class="chip" href={`/skills?skill=${lang}`}>{lang}</a>
										{/each}
									</div>
								{/if}
								{#if frameworks?.length}
									<div class="chip-container mr-2">
										<Tooltip>
											<Fa icon={faLayerGroup} />
											{#snippet tooltip()}Frameworks{/snippet}
										</Tooltip>
										{#each frameworks || [] as framework}
											<a class="chip" href={`/skills?skill=${framework}`}>{framework}</a>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
					<p class="project-description">{description}</p>
				</div>
				{#if !isMobile}
					<a {href} target="_blank" rel="noopener noreferrer" tabindex="-1">
						<img class="project-image" src={image} alt={`${title} icon`} width="256" />
					</a>
				{/if}
			</div>
		</div>
	{/each}
{/each}

<p class="container text-center pt-0">
	<a href="/gamble">Gamble your savings away until I add more content to this site!</a>
</p>

<script lang="ts">
import projects from "../data/projects.json";
import Fa from "svelte-fa";
import { faCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "~/components/Tooltip.svelte";

let innerWidth = $state(0);
const isMobile = $derived(innerWidth <= 760);
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
	// fixes short descriptions not pushing the images to the right
	// remove this if putting images on left
	justify-content: space-between;
	padding: 32px 16px;
	min-height: 256px;
	gap: 32px;
}

.project-header {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 8px;
	margin-bottom: 16px;
}

.skill-container {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	margin: 4px 0;
}

.project-description {
	margin: 0;
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

@media screen and (max-width: 760px) {
	.project-container {
		min-height: auto;
	}
	.project-image:hover {
		transform: inherit;
	}
}
</style>
