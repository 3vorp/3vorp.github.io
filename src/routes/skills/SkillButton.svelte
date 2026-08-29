<button
	class={["skill-selector", selected && "selected-skill-selector"]}
	onclick={() => onselect(skill.name)}
>
	{skill.name} <span class="project-count-badge">{skill.count}</span>
</button>

<script lang="ts">
import type { SkillRecord } from "~/helpers/projectSkills";

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
@use "~/css/variables.scss" as *;

.skill-selector {
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
		background: $accent-mid;
	}
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
</style>
