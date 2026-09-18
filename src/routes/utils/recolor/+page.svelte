<div class="container">
	<h1>Batch Recolorer</h1>
	<p class="caption text-center">Batch recolor an image to match a series of provided templates.</p>
	<h2 class="mt-5">Instructions</h2>
	<p>
		Batch recoloring operates on three different image types: the base image, the reference image,
		and a series of color templates.
	</p>
	<ul>
		<li>The base image is simply the image that you want to recolor.</li>
		<li>The reference image should share the colors of the base image.</li>
		<li>
			The color templates should be already-recolored versions of the reference image, which the new
			colors will be based on.
		</li>
	</ul>
	<p>
		Any colors that aren't shared between the reference and base images will be ignored, which is
		handy if only part of an image needs recoloring.
	</p>
	<h2 class="mt-5">Upload Images</h2>
	<div class="flex-row my-3">
		<DropZone accept="image/png" onchange={(file) => onFileInput("image", file)}>
			{#snippet children(isDragging)}
				{#if image}
					<img src={image.src} alt={image.alt} class="image-preview" />
				{/if}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} /> Release to Drop Base Image
				{:else if image}
					<Fa icon={faPen} /> Replace Base Image
				{:else}
					<Fa icon={faPlus} /> Upload Base Image
				{/if}
			{/snippet}
		</DropZone>
		<DropZone accept="image/png" onchange={(file) => onFileInput("reference", file)}>
			{#snippet children(isDragging)}
				{#if reference}
					<img src={reference.src} alt={reference.alt} class="image-preview" />
				{/if}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} /> Release to Drop Reference
				{:else if reference}
					<Fa icon={faPen} /> Replace Reference
				{:else}
					<Fa icon={faPlus} /> Upload Reference
				{/if}
			{/snippet}
		</DropZone>
	</div>
	<div>
		<DropZone
			accept="image/png, application/zip"
			multiple
			onchange={(file) => onFileInput("template", file)}
		>
			{#snippet children(isDragging)}
				{#each templates as { src, alt } (src)}
					<img {src} {alt} class="image-preview" />
				{/each}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} /> Release to Drop Template(s)
				{:else}
					<Fa icon={faPlus} /> Upload Templates ({templates.length}
					uploaded)
				{/if}
			{/snippet}
		</DropZone>
	</div>
	<div class="flex-row my-3">
		<button
			class="widget btn"
			disabled={!image && !reference && !templates.length}
			onclick={clearImages}
		>
			<Fa icon={faTrash} /> Clear All Inputs
		</button>
		<button class="widget btn" disabled={!templates.length} onclick={() => templates.pop()}>
			<Fa icon={faDeleteLeft} /> Remove Last Added Template
		</button>
	</div>
	<div class="my-3">
		<button class="widget btn btn-primary block" disabled={!isValid} onclick={generate}>
			<Fa icon={loading ? faSpinner : faArrowUpFromBracket} /> Recolor Images
		</button>
	</div>
	<span class="text-center all-center">
		<small class="mt-3">
			Fun Fact: The tooling browsers give you to do client-side color manipulation is so broken that
			<a
				href="https://stackoverflow.com/a/23501676/20327257"
				rel="noopener noreferrer"
				target="_blank"
			>
				pretty much all browsers randomly change color values you just set
			</a> due to premultiplied alpha rounding issues, so I had to use two third-party libraries to make
			things work somewhat correctly (and there's still probably issues if you try hard enough to find
			them).
		</small>
	</span>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faArrowUpFromBracket,
	faDeleteLeft,
	faPen,
	faPlus,
	faSpinner,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DropZone from "~/components/DropZone.svelte";
import batchRecolor from "~/helpers/batchRecolor";
import { showError } from "~/helpers/snackbar.svelte";

// svelte doesn't work with enums (why does anyone like this framework)
type FileType = "image" | "reference" | "template";

let image = $state<HTMLImageElement>();
let reference = $state<HTMLImageElement>();
const templates = $state<HTMLImageElement[]>([]);
let zipUrl = $state<string>();
let loading = $state(false);

const isValid = $derived(image && reference && templates.length);
const downloadName = $derived.by(() => {
	// keep png extension (nice qol feature)
	if (templates.length === 1 && image?.alt) return `converted_${image.alt}`;
	if (image?.alt) return `converted_${image.alt.split(".")[0]}.zip`;
	return "converted.zip";
});

async function generate() {
	// can't use isValid due to typescript weirdness (death)
	if (!image || !reference || !templates.length)
		return showError(
			"At least one image is missing",
			"This shouldn't be possible to see, so something has probably gone very wrong",
		);
	loading = true;
	try {
		const blob = await batchRecolor({ reference, image, templates });
		zipUrl = URL.createObjectURL(blob);
		const download = document.createElement("a");
		download.href = zipUrl;
		download.download = downloadName;
		download.click();
	} catch (err) {
		showError("Failed to recolor images", String(err), true);
	} finally {
		loading = false;
	}
}
function onFileInput(fileType: FileType, file: File | File[]) {
	if (Array.isArray(file)) return file.forEach((f) => onFileInput(fileType, f));
	const img = new Image();

	img.src = URL.createObjectURL(file);
	// we store the filename as the image alt
	img.alt = file.name;
	img.onload = () => update(fileType, img);
}
function update(fileType: FileType, updated: HTMLImageElement) {
	switch (fileType) {
		case "image":
			image = updated;
			break;
		case "reference":
			reference = updated;
			break;
		case "template":
			templates.push(updated);
			break;
	}
}
function clearImages() {
	if (zipUrl) URL.revokeObjectURL(zipUrl);
	// prevent massive memory leaks if the user doesn't close the tab
	if (image) URL.revokeObjectURL(image.src);
	if (reference) URL.revokeObjectURL(reference.src);
	templates.forEach((template) => URL.revokeObjectURL(template.src));

	zipUrl = undefined;
	image = undefined;
	reference = undefined;
	// yes this actually works
	templates.length = 0;
}
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.flex-row {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	@media screen and (max-width: $breakpoint-sm) {
		grid-template-columns: 1fr;
	}
}
.image-preview {
	opacity: 1 !important;
	image-rendering: pixelated;
	height: 4rem;
	margin-right: 0.75rem;
}
</style>
