<div class="skill-container">
	{#if langs.length}
		<div class="chip-container mr-2">
			<Tooltip>
				<Fa icon={faCode} />
				{#snippet tooltip()}Languages{/snippet}
			</Tooltip>
			{#each langs as lang (lang)}
				<a href={`/projects?skill=${lang}`} class="chip" onclick={() => onselect?.(lang)}>
					{lang}
				</a>
			{/each}
		</div>
	{/if}
	{#if frameworks.length}
		<div class="chip-container mr-2">
			<Tooltip>
				<Fa icon={faLayerGroup} />
				{#snippet tooltip()}Frameworks{/snippet}
			</Tooltip>
			{#each frameworks as framework (framework)}
				<a href={`/projects?skill=${framework}`} class="chip" onclick={() => onselect?.(framework)}>
					{framework}
				</a>
			{/each}
		</div>
	{/if}
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "#components/Tooltip.svelte";

const {
	langs = [],
	frameworks = [],
	onselect,
}: { langs?: string[]; frameworks?: string[]; onselect?: (skill: string) => void } = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.skill-container {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	margin: 4px 0;
}

.chip-container {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 8px;
	margin: 4px 0;
}

.chip {
	padding: 4px 8px;
	background-color: rgba($accent-dark, 0.2);
	color: $accent-mid;
	border-radius: $border-radius;
	transition: all $transition;
}

a.chip:hover,
a.chip:focus {
	background-color: rgba($accent-dark, 0.5);
	color: $accent-light;
}

a.chip:active {
	background-color: $accent-dark;
	color: white;
}
</style>
