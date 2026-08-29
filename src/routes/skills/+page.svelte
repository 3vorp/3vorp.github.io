<div class="container">
	<h1>My Skills</h1>

	<div class="skill-container">
		<div class="skill-list">
			{#each Object.entries(groupedKeys) as [type, keys] (type)}
				<button class="skill-group-title ma-2" onclick={() => collapseGroup(type)}>
					<h3 class="my-0">{type}</h3>
					<Fa
						class="mx-2"
						icon={collapsedGroups[type] ? faChevronRight : faChevronDown}
						size="0.8x"
					/>
				</button>
				{#if !collapsedGroups[type]}
					<div class="skill-group-list">
						{#each keys as key (key)}
							<button
								class={["skill-selector", selectedCategory === key && "selected-skill-selector"]}
								onclick={() => selectCategory(key)}
							>
								{key} <span class="project-count-badge">{groupedProjects[key].length}</span>
							</button>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
		<div class="skill-preview">
			{#each groupedProjects[selectedCategory] as { title, description, href, image, langs, frameworks } (title)}
				<div class="project-container">
					<img class="project-image" src={image} alt={`${title} icon`} width="64" loading="lazy" />
					<div>
						<a class="h3" {href} target="_blank" rel="noopener noreferrer">
							{title}
						</a>
						<p class="project-subtitle mt-0 mb-2">
							<small>{[...(langs || []), ...(frameworks || [])].join(" • ")}</small>
						</p>
						<p class="project-description my-0">{description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="text-center" style="display: flex; flex-flow: column nowrap; align-items: center">
		<h2>Looking for my artwork?</h2>
		<a href="/commissions" class="widget btn btn-primary">Check out my recent commissions</a>
	</div>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import projectSkills from "~/helpers/projectSkills";
import { onMount } from "svelte";

const URL_PARAM = "skill";

const { availableKeys, groupedKeys, groupedProjects } = projectSkills();

let selectedCategory = $state(availableKeys[0]);
const collapsedGroups: Record<string, boolean> = $state({});

function selectCategory(category: string) {
	if (!availableKeys.includes(category)) return;
	selectedCategory = category;
	const url = new URL(location.toString());
	url.searchParams.set(URL_PARAM, category);
	history.replaceState({}, "", url);

	// scroll down on mobile to view projects
	if (window.innerWidth < 960)
		document.querySelector(".skill-preview")?.scrollIntoView({ behavior: "smooth" });
}

function collapseGroup(group: string) {
	collapsedGroups[group] = !collapsedGroups[group];
}

onMount(() => {
	const url = new URL(location.toString());
	const skillParam = url.searchParams.get(URL_PARAM);
	if (!skillParam || !availableKeys.includes(skillParam)) {
		url.searchParams.set(URL_PARAM, availableKeys[0]);
		history.replaceState({}, "", url);
	}

	selectedCategory = url.searchParams.get(URL_PARAM) || availableKeys[0];
});
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.skill-container {
	display: flex;
	flex-flow: row nowrap;
	align-items: start;
	justify-content: center;
	margin: 64px 0;
	gap: 16px;
}

.skill-list {
	display: flex;
	flex-flow: column nowrap;
	background: $fg-light;
	border-radius: $border-radius;
	padding: 0.5rem;
	position: sticky;
	// 64px navbar + 8px padding
	top: 72px;
	width: 256px;
	filter: drop-shadow($drop-shadow);
}

.skill-group-title {
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
}

.skill-group-list {
	display: flex;
	flex-flow: column nowrap;
}

.skill-preview {
	display: flex;
	flex-flow: column nowrap;
	width: calc(100% - 256px);
	gap: 32px;

	background: $bg-mid;
	border-radius: $border-radius;
	padding: 1rem;
	filter: drop-shadow($drop-shadow);
}

.project-container {
	display: flex;
	flex-flow: row nowrap;
	align-items: start;
	justify-content: start;
	gap: 8px;
}

.project-image {
	filter: drop-shadow($drop-shadow);
}

.project-subtitle {
	color: $content-mid;
}

.project-description {
	color: $content-light;
}

.project-count-badge {
	color: white !important;
	font-weight: $weight-bold;
	background: $bg-light;
	border-radius: $border-radius;
	padding: 2px 8px;
	filter: drop-shadow($drop-shadow);
	transition: all 0.25s ease;
}

.skill-selector {
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	border-radius: $border-radius;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	background: none;
	color: $content-mid;
	border: none;
	text-align: left;
	transition: all 0.25s ease;

	&:not(.selected-skill-selector):hover {
		background-color: $bg-mid;
	}
}

.selected-skill-selector {
	color: white;
	font-weight: $weight-bold;
	background: $accent-dark;
	filter: drop-shadow($drop-shadow);

	.project-count-badge {
		background: $accent-light;
	}
}

@media screen and (max-width: 960px) {
	.skill-container {
		flex-flow: column nowrap;
	}
	.skill-list {
		position: static;
		width: 100%;
	}
	.skill-group-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	.skill-preview {
		width: 100%;
	}
	.project-description {
		margin-left: -64px;
	}
}

@media screen and (max-width: 576px) {
	.skill-group-list {
		display: flex;
		flex-flow: column nowrap;
	}
}
</style>
