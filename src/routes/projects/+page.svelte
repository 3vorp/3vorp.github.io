<div class="container">
	<h1>Programming Work</h1>
	<!-- god I hate html link formatting this is so ugly -->
	<p class="caption text-center">
		More projects can also be found on my <a
			href="https://github.com/3vorp?tab=repositories"
			target="_blank"
			rel="noopener noreferrer"
		>
			GitHub
		</a>
		and
		<a href="https://gist.github.com/3vorp" target="_blank" rel="noopener noreferrer">
			GitHub Gist
		</a> pages.
	</p>

	<div class="skill-container">
		<!-- don't use bind:selectedSkill to correctly update query params -->
		<SkillList {skillData} {selectedSkill} total={projects.length} onselect={selectSkill} />
		<ProjectList
			projects={selectedSkill ? groupedBySkill[selectedSkill] : projects}
			onselect={selectSkill}
		/>
	</div>

	<br /><br />
	<div class="cta-container">
		<h2>Looking for my artwork?</h2>
		<a href="/portfolio" class="btn btn-primary">Check out my portfolio</a>
	</div>
</div>

<script lang="ts">
import { onMount } from "svelte";
import { goto } from "$app/navigation";

import SkillList from "./SkillList.svelte";
import ProjectList from "./ProjectList.svelte";

import projects from "#data/projects.json";
import projectSkills from "#helpers/projectSkills.ts";

const URL_PARAM = "skill";

const { availableSkills, skillData, groupedBySkill } = projectSkills(projects);

let selectedSkill: string | undefined = $state();

function selectSkill(skill: string | undefined) {
	if (skill && !availableSkills.includes(skill)) return;
	selectedSkill = skill;
	const url = new URL(location.toString());
	if (skill === undefined) url.searchParams.delete(URL_PARAM);
	else url.searchParams.set(URL_PARAM, skill);
	goto(url, { replace: true });

	if (window.innerWidth < 960)
		document.getElementById("project-list")?.scrollIntoView({ behavior: "smooth" });
}

onMount(() => {
	const url = new URL(location.toString());
	const skillParam = url.searchParams.get(URL_PARAM);

	// invalid skill, reset
	if (skillParam && !availableSkills.includes(skillParam)) {
		url.searchParams.delete(URL_PARAM);
		goto(url, { replace: true });
	}
	selectedSkill = url.searchParams.get(URL_PARAM) || undefined;
});
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.skill-container {
	display: flex;
	flex-flow: row nowrap;
	align-items: start;
	justify-content: start;
	gap: $grid-gap;
}

@media screen and (max-width: $breakpoint-md) {
	.skill-container {
		flex-flow: column nowrap;
	}
}
</style>
