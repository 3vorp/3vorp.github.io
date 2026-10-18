<div class="container">
	<h1>My Portfolio</h1>
	<p class="caption">
		A non-exhaustive list of artwork I've made over roughly the past four years.
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
		<a href="/projects" class="btn btn-primary">Check out my recent projects</a>
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
import { onMount, tick } from "svelte";
import { goto } from "$app/navigation";

import Fa from "svelte-fa";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import ArtCard from "./ArtCard.svelte";
import ArtDialog from "./ArtDialog.svelte";
import Overlay from "#components/popups/Overlay.svelte";

import portfolio from "#data/portfolio.json";
import type { PortfolioItem } from "./types.d.ts";

const URL_PARAM = "show";

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

$effect(() => {
	const url = new URL(location.toString());
	if (!modalOpen) url.searchParams.delete(URL_PARAM);
	else url.searchParams.set(URL_PARAM, modalItem?.title || "");
	goto(url, { replace: true });
});

onMount(() => {
	const url = new URL(location.toString());
	const showParam = url.searchParams.get(URL_PARAM);

	if (!showParam) return;

	const found = portfolio.find((p) => p.title === showParam);

	// invalid show, reset
	if (!found) {
		url.searchParams.delete(URL_PARAM);
		return goto(url, { replace: true });
	}

	modalOpen = true;
	modalItem = found;
	modalCategory = found.category;
});
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
