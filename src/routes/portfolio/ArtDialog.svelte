<svelte:window bind:innerWidth />

<Dialog bind:open maxWidth={innerWidth > 760 ? "80vw" : "100%"}>
	{#snippet children(handleClick)}
		<!-- compensate for card padding by negating top/bottom padding -->
		<div class="split-panel">
			<div class="image-display">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					src={`/portfolio/${item.src}`}
					alt={item.alt}
					class={["image", { "pa-4": item.pad }]}
					onclick={onfullscreen}
				/>
				<button class="btn btn-image" onclick={onfullscreen}>
					<Fa icon={faExpand} />
				</button>
			</div>
			<div class="text-display card-body">
				<div class="header">
					<h3 class="my-0">{item.title}</h3>
					<div class="spacer"></div>
					<!-- on mobile the close button is kinda in the middle but oh well -->
					<button class="btn-icon" title="Close Dialog" onclick={() => handleClick(false)}>
						<Fa icon={faClose} size="lg" />
					</button>
				</div>
				<small>{category}</small>
				<p class="mb-0" style="white-space: pre-line">{item.description}</p>
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
							class="btn btn-text btn-primary block"
							href={link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{label}
						</a>
					{/each}
					{#if item.show_download}
						<a
							class="btn btn-text btn-primary block"
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
	{/snippet}
</Dialog>

<script lang="ts">
import Fa from "svelte-fa";
import type { PortfolioItem } from "./types.d.ts";
import {
	faCalendar,
	faClose,
	faDownload,
	faExpand,
	faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "#components/popups/Dialog.svelte";

let {
	open = $bindable(),
	category,
	item = { src: "", title: "Unknown Work", description: "", date: "0000-00-00", tools: "Unknown" },
	onfullscreen = () => {},
}: { open: boolean; category?: string; item?: PortfolioItem; onfullscreen: () => void } = $props();

const humanDate = $derived(
	new Date(item.date).toLocaleString("en-us", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}),
);

let innerWidth = $state(0);
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.split-panel {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.image-display {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	background-color: $fg-light;
	position: relative;
}

.image {
	max-height: 70vh;
	filter: drop-shadow($drop-shadow);
	cursor: pointer;
}

.text-display {
	display: flex;
	flex-flow: column nowrap;
}

.header {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
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
