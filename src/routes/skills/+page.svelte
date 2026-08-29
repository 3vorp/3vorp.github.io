<div class="container">
	<h1>My Skills</h1>

	<div class="skill-container">
		<!-- don't use bind:selectedSkill to correctly update query params -->
		<SkillList {groupedSkills} {selectedSkill} onselect={selectSkill} />
		<div class="project-preview-container">
			{#each groupedProjects[selectedSkill] as project (project.title)}
				<ProjectPreview {...project} />
			{/each}
		</div>
	</div>

	<div class="cta-container">
		<h2>Looking for my artwork?</h2>
		<a href="/commissions" class="widget btn btn-primary">Check out my recent commissions</a>
	</div>
</div>

<script lang="ts">
import { onMount } from "svelte";
import projectSkills from "~/helpers/projectSkills";
import SkillList from "./SkillList.svelte";
import ProjectPreview from "./ProjectPreview.svelte";

const URL_PARAM = "skill";

const { availableSkills, groupedSkills, groupedProjects } = projectSkills();

let selectedSkill = $state(availableSkills[0]);

function selectSkill(skill: string) {
	if (!availableSkills.includes(skill)) return;
	selectedSkill = skill;
	const url = new URL(location.toString());
	url.searchParams.set(URL_PARAM, skill);
	// assigning to window.location causes sveltekit to freak out
	history.replaceState({}, "", url);

	// scroll down on mobile to view projects
	if (window.innerWidth < 960)
		document.querySelector(".skill-preview")?.scrollIntoView({ behavior: "smooth" });
}

onMount(() => {
	const url = new URL(location.toString());
	const skillParam = url.searchParams.get(URL_PARAM);
	if (!skillParam || !availableSkills.includes(skillParam)) {
		url.searchParams.set(URL_PARAM, availableSkills[0]);
		history.replaceState({}, "", url);
	}
	selectedSkill = url.searchParams.get(URL_PARAM) || availableSkills[0];
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

.project-preview-container {
	display: flex;
	flex-flow: column nowrap;
	width: calc(100% - 256px);
	gap: 32px;

	background: $bg-mid;
	border-radius: $border-radius;
	padding: $padding-container;
	filter: drop-shadow($drop-shadow);
}

@media screen and (max-width: $breakpoint-md) {
	.skill-container {
		flex-flow: column nowrap;
	}
	.project-preview-container {
		width: 100%;
	}
}
</style>
