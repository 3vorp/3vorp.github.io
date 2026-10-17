<div id="project-list">
	{#each Object.entries(groupedProjects) as [category, projects], i (category)}
		<h2>{category}</h2>
		<div class="card card-body project-section">
			{#each projects as project (project.title)}
				<ProjectPreview {...project} {onselect} />
			{/each}
		</div>
		<!-- make sure skill list and project list line up at the bottom -->
		{#if i !== Object.keys(groupedProjects).length - 1}
			<br />
		{/if}
	{/each}
</div>

<script lang="ts">
import type { Project } from "#helpers/projectSkills.ts";
import ProjectPreview from "./ProjectPreview.svelte";

const { projects, onselect }: { projects: Project[]; onselect: (skill: string) => void } = $props();

const groupedProjects = $derived(
	Object.groupBy(projects, ({ category }) => category) as Record<string, Project[]>,
);
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

// I normally hate using ids in css but this is used for scrolling on mobile so might as well reuse it
#project-list {
	width: 100%;
}

.project-section {
	display: flex;
	flex-flow: column nowrap;
	gap: 32px;
}
</style>
