<article>
	<div class="project-header">
		<img src={image} alt={`${title} icon`} loading="lazy" width="64" class="project-image" />
		<div>
			<a {href} class="h3" rel="noopener noreferrer" target="_blank">
				{title}
			</a>
			<small class="project-subtitle my-0">
				<SkillChips {langs} {frameworks} {onselect} />
			</small>
		</div>
	</div>
	<p class="project-description my-0">{description}</p>
</article>

<script lang="ts">
import SkillChips from "./SkillChips.svelte";
import type { Project } from "#helpers/projectSkills.ts";

// spread entire project object
const {
	title,
	description,
	image,
	href,
	langs = [],
	frameworks = [],
	onselect,
}: Project & { onselect: (skill: string) => void } = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.project-header {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
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
	// pad to line up with title (looks nice)
	margin-left: calc(64px + 8px);
}

@media screen and (max-width: $breakpoint-sm) {
	// win back indent space on mobile
	.project-description {
		margin-left: 0;
	}
}
</style>
