<div class="container">
	<h1>My Portfolio</h1>
	<p class="text-center caption">
		A non-exhaustive list of artwork I've made over the past 4+ years.
	</p>

	{#each Object.entries(groupedPortfolios) as [category, items] (category)}
		<h2>{category}</h2>
		<div class={`grid-${items.length > 4 ? 3 : items.length} mt-4`}>
			{#each items as item (item.src)}
				<ArtCard
					image={`/portfolio/${item.src}`}
					alt={item.alt}
					title={item.title}
					date={new Date(item.date)}
					padImage={"pad" in item ? item.pad : false}
					onclick={() => openModal(category, item)}
				/>
			{/each}
		</div>
		<br /><br />
	{/each}

	<div class="cta-container">
		<h2>Looking for my programming work?</h2>
		<a href="/skills" class="btn btn-primary">Check out my recent projects</a>
	</div>
</div>

<ArtDialog
	bind:open={modalOpen}
	category={modalCategory}
	item={modalItem}
	onfullscreen={() => openFullscreen(modalItem?.src || "")}
/>

<Overlay open={fullscreenOpen} onclickoff={() => closeFullscreen(undefined)}>
	<div
		role="dialog"
		class={["preview-container", { open: fullscreenOpen }]}
		tabindex="0"
		bind:this={fullscreenRef}
		onkeydown={({ key }) => closeFullscreen(key)}
	>
		<img src={`/portfolio/${fullscreenImage}`} alt="Fullscreen preview" class="preview" />
		<button class="btn btn-image" onclick={() => closeFullscreen(undefined)}>
			<Fa icon={faClose} />
		</button>
	</div>
</Overlay>

<script lang="ts">
import ArtCard from "./ArtCard.svelte";
import ArtDialog from "./ArtDialog.svelte";
import Overlay from "#components/popups/Overlay.svelte";

import { tick } from "svelte";
import Fa from "svelte-fa";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import portfolio from "#data/portfolio.json";
import type { PortfolioItem } from "./types.d.ts";

const groupedPortfolios = $derived(
	Object.groupBy(portfolio, ({ category }) => category) as Record<string, PortfolioItem[]>,
);

let modalOpen = $state(false);
let modalCategory = $state("");
let modalItem: PortfolioItem | undefined = $state(undefined);

function openModal(category: string, item: PortfolioItem) {
	modalOpen = true;
	modalCategory = category;
	modalItem = item;
}

let fullscreenOpen = $state(false);
let fullscreenImage = $state("");
let fullscreenRef: HTMLDivElement | undefined = $state();

async function openFullscreen(image: string) {
	fullscreenOpen = true;
	fullscreenImage = image;
	await tick();
	fullscreenRef?.focus();
}

function closeFullscreen(key: string | undefined) {
	if (key !== undefined && key !== "Escape" && key !== "Enter") return;
	fullscreenOpen = false;
}
</script>

<style lang="scss">
.preview-container {
	position: relative;
}

.preview-container.open {
	animation: open 0.25s;
}

.preview {
	max-width: 90vw;
	max-height: 90vh;
	width: auto;
	height: auto;
	object-fit: contain;
}
</style>
