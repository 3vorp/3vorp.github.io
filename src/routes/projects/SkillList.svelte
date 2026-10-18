<div class="skill-list">
	<SkillButton
		selected={selectedSkill === undefined}
		skill={{ name: "All Projects", count: total }}
		onselect={() => onselect(undefined)}
	/>
	{#each Object.entries(skillData) as [type, skills] (type)}
		<button class="skill-group-title" onclick={() => collapseGroup(type)}>
			<h2 class="h3 my-0">{type}</h2>
			<Fa icon={collapsedGroups[type] ? faChevronRight : faChevronDown} size="0.8x" class="mx-2" />
		</button>
		{#if !collapsedGroups[type]}
			<div class="skill-group-list">
				{#each skills as skill (skill.name)}
					<SkillButton {onselect} selected={selectedSkill === skill.name} {skill} />
				{/each}
			</div>
		{/if}
	{/each}
</div>

<script lang="ts">
import { onMount } from "svelte";

import Fa from "svelte-fa";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import SkillButton from "./SkillButton.svelte";
import type { SkillRecord } from "#helpers/projectSkills.ts";

const {
	selectedSkill,
	skillData,
	total,
	onselect,
}: {
	selectedSkill: string | undefined;
	skillData: Record<string, SkillRecord[]>;
	total: number;
	onselect: (skill: string | undefined) => void;
} = $props();

const collapsedGroups = $state<Record<string, boolean>>({});

function collapseGroup(group: string) {
	collapsedGroups[group] = !collapsedGroups[group];
}

// collapse filters on mobile by default (doesn't update on resize so can be onMount)
onMount(() => {
	if (window.innerWidth < 576) {
		for (const type of Object.keys(skillData)) collapsedGroups[type] = true;
	}
});
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.skill-list {
	display: flex;
	flex-flow: column nowrap;
	background: $fg-light;
	border-radius: $border-radius;
	padding: calc($padding-container / 2);
	position: sticky;
	// 64px navbar + 8px padding
	top: 72px;
	min-width: 256px;
	width: 256px;
	filter: drop-shadow($drop-shadow);
}

.skill-group-title {
	cursor: pointer;
	padding: calc($padding-container / 2);
	background: none;
	border: none;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
}

.skill-group-list {
	display: flex;
	flex-flow: column nowrap;
}

@media screen and (max-width: $breakpoint-md) {
	.skill-list {
		position: static;
		width: 100%;
	}
	.skill-group-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
}

@media screen and (max-width: $breakpoint-xs) {
	.skill-group-list {
		display: flex;
		flex-flow: column nowrap;
	}
}
</style>
