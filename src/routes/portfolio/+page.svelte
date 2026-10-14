<div class="container">
	<h1>My Portfolio</h1>
	<p class="text-center caption">
		A non-exhaustive list of artwork I've made over the past 4+ years.
	</p>

	{#each Object.entries(portfolio) as [category, items] (category)}
		<h2>{category}</h2>
		<div class={`grid-${items.length > 4 ? 3 : items.length} mt-4`}>
			{#each items as item (item.src)}
				<ArtCard
					image={`/portfolio/${item.src}`}
					alt={item.alt}
					title={item.title}
					date={new Date(item.date)}
					onclick={() => openModal(category, item as any)}
				/>
			{/each}
		</div>
		<br /><br />
	{/each}

	<div class="cta-container">
		<h2>Looking for my programming work?</h2>
		<a href="/skills" class="widget btn btn-primary">Check out my recent projects</a>
	</div>
</div>

<ArtDialog
	bind:open={modalOpen}
	category={modalCategory}
	item={modalItem}
	onfullscreen={() => openFullscreen(modalItem?.src || "")}
	bind:this={modalRef}
/>

<Overlay open={fullscreenOpen} onclickoff={() => closeFullscreen(undefined)}>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<img
		tabindex="0"
		src={`/portfolio/${fullscreenImage}`}
		alt="Fullscreen preview"
		class={["fullscreen-preview", { open: fullscreenOpen }]}
		onkeydown={({ key }) => closeFullscreen(key)}
		bind:this={fullscreenRef}
	/>
</Overlay>

<script lang="ts">
import ArtCard from "./ArtCard.svelte";
import ArtDialog from "./ArtDialog.svelte";
import portfolio from "#data/portfolio.json";
import type { PortfolioItem } from "./types.d.ts";
import Overlay from "#components/Overlay.svelte";
import { tick } from "svelte";

let modalOpen = $state(false);
let modalCategory = $state("");
let modalItem: PortfolioItem | undefined = $state(undefined);
let modalRef: any = $state();

function openModal(category: string, item: PortfolioItem) {
	modalOpen = true;
	modalCategory = category;
	modalItem = item;
}

let fullscreenOpen = $state(false);
let fullscreenImage = $state("");
let fullscreenRef: HTMLImageElement | undefined = $state();

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
.fullscreen-preview {
	max-width: 90vw;
	max-height: 90vh;
	width: auto;
	height: auto;
	object-fit: contain;
}

.fullscreen-preview.open {
	animation: open 0.25s;
}
</style>
