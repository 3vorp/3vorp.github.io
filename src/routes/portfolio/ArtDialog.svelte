<Dialog bind:open maxWidth={1140} title={item.title} subtitle={category} hideActions>
	<div class="split-panel mb-n4" bind:this={ref}>
		<div class="image-display">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img src={`/portfolio/${item.src}`} alt={item.alt} class="image" onclick={onfullscreen} />
			<button class="widget btn btn-icon fullscreen-icon" onclick={onfullscreen}>
				<Fa icon={faExpand} />
			</button>
		</div>
		<div class="text-display">
			<p class="my-0" style="white-space: pre-line">{item.description}</p>
			<ul class="icon-list">
				<li>
					<Fa icon={faCalendar} class="mr-2" />
					{humanDate}
				</li>
				<li>
					<Fa icon={faScrewdriverWrench} class="mr-1" />
					{item.tools}
				</li>
			</ul>
			<div class="spacer"></div>

			<div class="flex-row">
				{#each Object.entries(item.links || {}) as [label, link] (link)}
					<a
						class="widget btn btn-text btn-primary block"
						href={link}
						target="_blank"
						rel="noopener noreferrer"
					>
						{label}
					</a>
				{/each}
				{#if item.show_download}
					<a
						class="widget btn btn-text btn-primary block"
						href={item.src}
						download={item.src.split("/").at(-1)}
					>
						<Fa icon={faDownload} />
						Download Image
					</a>
				{/if}
			</div>
		</div>
	</div>
</Dialog>

<script lang="ts">
import Dialog from "#components/Dialog.svelte";
import Fa from "svelte-fa";
import type { PortfolioItem } from "./types.d.ts";
import {
	faCalendar,
	faDownload,
	faExpand,
	faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

let {
	open = $bindable(),
	category,
	item = { src: "", title: "Unknown Work", description: "", date: "0000-00-00", tools: "Unknown" },
	onfullscreen = () => {},
}: { open: boolean; category?: string; item?: PortfolioItem; onfullscreen: () => void } = $props();

let ref: any = $state();

const humanDate = $derived(
	new Date(item.date).toLocaleString("en-us", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}),
);

$effect(() => {
	if (open) ref?.focus();
});
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.split-panel {
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.image-display {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: $border-radius;
	position: relative;
	background-color: $fg-light;
}

.image {
	max-height: 60vh;
	filter: drop-shadow($drop-shadow);
	border-radius: $border-radius;
	cursor: pointer;
}

.text-display {
	display: flex;
	flex-flow: column nowrap;
}

.icon-list {
	list-style-type: none;
	padding-left: 0;
}

.flex-row {
	display: flex;
	flex-flow: row nowrap;
	gap: 1rem;
}

.fullscreen-icon {
	position: absolute;
	top: $padding-container;
	right: $padding-container;
	background: rgba($fg-dark, 0.5);
}

@media screen and (max-width: $breakpoint-md) {
	.split-panel {
		display: flex;
		flex-flow: column nowrap;
	}
	.image {
		max-width: 100%;
	}
}

@media screen and (max-width: $breakpoint-sm) {
	.flex-row {
		flex-flow: column nowrap;
	}
}
</style>
