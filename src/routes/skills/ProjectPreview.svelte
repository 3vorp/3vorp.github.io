<div class="project-preview">
	<img src={image} alt={`${title} icon`} loading="lazy" width="64" class="project-image" />
	<div>
		<a {href} class="h3" rel="noopener noreferrer" target="_blank">
			{title}
		</a>
		<p class="project-subtitle mt-0 mb-2">
			<small>{[...langs, ...frameworks].join(" • ")}</small>
		</p>
		<p class="project-description my-0">{description}</p>
	</div>
</div>

<script lang="ts">
import type { Project } from "~/helpers/projectSkills";

// spread entire project object
const { title, description, image, href, langs = [], frameworks = [] }: Project = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.project-preview {
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

@media screen and (max-width: 960px) {
	// align with image to have more available space
	.project-description {
		margin-left: -64px;
	}
}
</style>
