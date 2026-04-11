<div class="container">
	<h1>Batch Recolorer</h1>
	<p class="text-center">Batch recolor an image to match a series of provided templates.</p>
	<h2 class="mt-5">Instructions</h2>
	<div>
		<p>
			Batch recoloring operates on three different image types: the base image, the reference image,
			and a series of color templates.
		</p>
		<ul>
			<li>The base image is simply the image that you want to recolor.</li>
			<li>The reference image should share the colors of the base image.</li>
			<li>
				The color templates should be already-recolored versions of the reference image, which the
				new colors will be based on.
			</li>
		</ul>
	</div>
	<p>
		Any colors that aren't shared between the reference and base images will be ignored, which is
		handy if only part of an image needs recoloring.
	</p>
	<h2 class="mt-5">Upload Images</h2>
	<div class="flex-row my-3">
		<DropZone accept="image/png" onchange={(file) => onFileInput(FileType.Image, file)}>
			{#snippet children(isDragging)}
				{#if image}
					<img src={image.src} class="image-preview" alt={image.alt} />
				{/if}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} />&nbsp; Release to Drop Base Image
				{:else if image}
					<Fa icon={faPen} />&nbsp; Replace Base Image
				{:else}
					<Fa icon={faPlus} />&nbsp; Upload Base Image
				{/if}
			{/snippet}
		</DropZone>
		<DropZone accept="image/png" onchange={(file) => onFileInput(FileType.Reference, file)}>
			{#snippet children(isDragging)}
				{#if reference}
					<img src={reference.src} class="image-preview" alt={reference.alt} />
				{/if}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} />&nbsp; Release to Drop Reference
				{:else if reference}
					<Fa icon={faPen} />&nbsp; Replace Reference
				{:else}
					<Fa icon={faPlus} />&nbsp; Upload Reference
				{/if}
			{/snippet}
		</DropZone>
	</div>
	<div>
		<DropZone
			accept="image/png, application/zip"
			multiple
			onchange={(file) => onFileInput(FileType.Template, file)}
		>
			{#snippet children(isDragging)}
				{#each templates as template}
					<img src={template.src} class="image-preview" alt={template.alt} />
				{/each}
				{#if isDragging}
					<Fa icon={faArrowUpFromBracket} />&nbsp; Release to Drop Template(s)
				{:else}
					<Fa icon={faPlus} />&nbsp; Upload Templates ({templates.length}
					uploaded)
				{/if}
			{/snippet}
		</DropZone>
	</div>
	<div class="flex-row my-3">
		<button
			class={["widget", "btn", { disabled: !image && !reference && !templates.length }]}
			onclick={clearImages}
		>
			<Fa icon={faTrash} />&nbsp; Clear All Inputs
		</button>
		<button
			class={["widget", "btn", { disabled: !templates.length }]}
			onclick={() => templates.pop()}
		>
			<Fa icon={faDeleteLeft} />&nbsp; Remove Last Added Template
		</button>
	</div>
	<div class="my-3">
		<button
			class={["widget", "btn", "btn-primary", "block", { disabled: !isValid }]}
			onclick={generate}
		>
			<Fa icon={loading ? faSpinner : faPalette} />&nbsp; Recolor Images
		</button>
	</div>
	<div class="my-3">
		<a class={["widget", "btn", { disabled: !zipUrl }]} href={zipUrl} download={downloadName}>
			<Fa icon={faAnglesDown} />&nbsp; Download Result
		</a>
	</div>
	<span class="text-center all-center">
		<small class="mt-3">
			Fun Fact: The tooling browsers give you to do client-side color manipulation is so broken that
			<a
				href="https://stackoverflow.com/a/23501676/20327257"
				target="_blank"
				rel="noopener noreferrer"
			>
				pretty much all browsers randomly change color values you just set
			</a> due to premultiplied alpha rounding issues, so I had to use two third-party libraries to make
			things work somewhat correctly (and there's still probably issues if you try hard enough to find
			them)
		</small>
	</span>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faAnglesDown,
	faArrowUpFromBracket,
	faDeleteLeft,
	faPalette,
	faPen,
	faPlus,
	faSpinner,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DropZone from "~/components/DropZone.svelte";
import batchRecolor from "~/helpers/batchRecolor";

enum FileType {
	Image,
	Reference,
	Template,
}

let image = $state<HTMLImageElement>();
let reference = $state<HTMLImageElement>();
const templates = $state<HTMLImageElement[]>([]);
let zipUrl = $state<string>();
let loading = $state(false);

const isValid = $derived(image && reference && templates.length);
const downloadName = $derived(
	image?.alt ? `converted-${image.alt.split(".")[0]}.zip` : `converted.zip`,
);

async function generate() {
	// can't use isValid due to typescript weirdness (death)
	if (!image || !reference || !templates.length)
		return alert("At least one image is missing (how did you do this)");
	loading = true;
	try {
		const blob = await batchRecolor({ reference, image, templates });
		zipUrl = URL.createObjectURL(blob);
	} catch (err) {
		alert(`Something went wrong when batch recoloring:\n${err}`);
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
		case FileType.Image:
			image = updated;
			break;
		case FileType.Reference:
			reference = updated;
			break;
		case FileType.Template:
			templates.push(updated);
			break;
	}
}
function clearImages() {
	if (zipUrl) URL.revokeObjectURL(zipUrl);
	// prevent massive memory leaks if the user doesn't close the tab
	if (image) URL.revokeObjectURL(image.src);
	if (reference) URL.revokeObjectURL(reference.src);
	templates.forEach((t) => URL.revokeObjectURL(t.src));

	zipUrl = undefined;
	image = undefined;
	reference = undefined;
	// yes this actually works
	templates.length = 0;
}
</script>

<style lang="scss">
.flex-row {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	@media screen and (max-width: 900px) {
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
