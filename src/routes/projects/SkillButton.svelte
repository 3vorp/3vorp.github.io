<button
	class={[
		"skill-selector",
		{ "selected-skill-selector": selected, "all-selector": skill.name === "All Projects" },
	]}
	onclick={() => onselect(skill.name)}
>
	{skill.name} <span class="project-count-badge">{skill.count}</span>
</button>

<script lang="ts">
import type { SkillRecord } from "#helpers/projectSkills.ts";

const {
	skill,
	selected,
	onselect,
}: {
	skill: SkillRecord;
	selected: boolean;
	onselect: (skill: string) => void;
} = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.skill-selector {
	font-size: $size-body-small;
	cursor: pointer;
	padding: calc($padding-container / 2);
	display: flex;
	border-radius: $border-radius;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	background: none;
	color: $content-mid;
	border: none;
	text-align: left;
	transition: all $transition;

	&:not(.selected-skill-selector):hover,
	&:not(.selected-skill-selector):focus {
		background-color: $bg-mid;
	}
	&:not(.selected-skill-selector):active {
		background-color: $bg-light;
	}
}

.selected-skill-selector {
	color: white;
	font-weight: $weight-bold;
	background: $accent-dark;
	filter: drop-shadow($drop-shadow);

	.project-count-badge {
		background: $accent-mid;
	}
}

// style it like a header since it's basically its own category
.all-selector {
	color: white;
	font-size: $size-title;
	font-weight: $weight-bold;
}

.project-count-badge {
	font-size: $size-body-small;
	color: white !important;
	font-weight: $weight-bold;
	background: $bg-light;
	border-radius: $border-radius;
	padding: 2px 8px;
	filter: drop-shadow($drop-shadow);
	transition: all $transition;
}
</style>
