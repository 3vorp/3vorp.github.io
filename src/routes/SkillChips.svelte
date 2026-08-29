<div class="skill-container">
	{#if langs.length}
		<div class="chip-container mr-2">
			<Tooltip>
				<Fa icon={faCode} />
				{#snippet tooltip()}Languages{/snippet}
			</Tooltip>
			{#each langs as lang (lang)}
				<a href={`/skills?skill=${lang}`} class="chip">{lang}</a>
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
				<a href={`/skills?skill=${framework}`} class="chip">{framework}</a>
			{/each}
		</div>
	{/if}
</div>

<script lang="ts">
import Tooltip from "~/components/Tooltip.svelte";

import Fa from "svelte-fa";
import { faCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const { langs = [], frameworks = [] }: { langs?: string[]; frameworks?: string[] } = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

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
	transition: all 0.25s ease;
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
