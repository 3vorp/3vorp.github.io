<!-- Adapted from TheRolf's Vue.js drop-zone design -->
<div class={["drop-zone", { "dropzone-dragging": isDragging, disabled }]}>
	<div
		class="dropzone-border"
		role="button"
		tabindex={0}
		ondragover={dragover}
		ondragleave={dragleave}
		ondrop={drop}
		onmouseup={click}
	></div>
	<input
		bind:this={fileRef}
		id="fileInput"
		name="file"
		type="file"
		class="hidden-input"
		{multiple}
		{accept}
		onchange={() => onChange(fileRef.files)}
	/>
	<label for="fileInput" class="label">
		{#if children}
			{@render children(isDragging)}
		{:else}
			Drag and Drop File or Click to Upload
		{/if}
	</label>
</div>

<script lang="ts">
import JSZip from "jszip";
import type { Snippet } from "svelte";

let {
	accept,
	multiple = false,
	disabled = false,
	children,
	// gets really confusing really quickly otherwise
	onchange: notifyParent,
}: {
	accept: string;
	multiple?: boolean;
	disabled?: boolean;
	children: Snippet<[boolean]>;
	onchange?: (f: File | File[]) => void;
} = $props();
let isDragging = $state(false);
// I hate typescript
let fileRef: HTMLInputElement = undefined as any;

async function onChange(rawFiles: FileList | File[] | null) {
	if (!rawFiles) return;
	for (const file of rawFiles) {
		if (!accept.includes(file.type)) {
			alert(
				`file type ${file.type} not allowed (must be ${accept})\n\n(too lazy for a real tooltip)`,
			);
			return;
		}
	}

	if (multiple && rawFiles[0].type === "application/zip") {
		console.log("gottem");
		const jz = await JSZip.loadAsync(rawFiles[0]);
		const files = await Promise.all(
			Object.values(jz.files).map(async (f) => new File([await f.async("blob")], f.name)),
		);
		notifyParent?.(files);
	}
	const files = multiple ? Array.from(rawFiles) : rawFiles[0];
	notifyParent?.(files);
}

function dragover(e: DragEvent) {
	if (disabled) return;

	e.preventDefault();
	isDragging = true;
}
function dragleave(e: DragEvent) {
	if (disabled) return;

	e.preventDefault();
	isDragging = false;
}
function drop(e: DragEvent) {
	if (disabled) return;

	e.preventDefault();
	const files = e.dataTransfer?.files;
	if (!files) return;
	onChange(files);
	isDragging = false;
}
function click() {
	if (disabled) return;
	fileRef.click();
	fileRef.blur();
}
</script>

<style lang="scss">
.drop-zone {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	position: relative;
	text-align: center;
	padding: 0 10px;
}
.drop-zone,
.drop-zone * {
	cursor: pointer;
}

.drop-zone .dropzone-border {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border: 1px dashed currentColor;
	z-index: 3;
	border-radius: 4px;
}

.drop-zone.disabled {
	pointer-events: none;
}

.drop-zone.disabled .dropzone-border,
.drop-zone.disabled .label {
	opacity: 0.5;
}
.drop-zone .dropzone-border {
	opacity: 0.7;
	transition: opacity 250ms ease;
}
.drop-zone:not(.disabled):hover .dropzone-border {
	opacity: 1;
}
.drop-zone .hidden-input {
	opacity: 0;
	overflow: hidden;
	position: absolute;
	width: 1px;
	height: 1px;
}
.drop-zone .label {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	min-height: 5rem;
	padding: 0.5rem;
}
</style>
