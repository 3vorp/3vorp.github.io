import JSZip from "jszip";

import {
	getImageDataAccurate,
	getImageDataAsTuples,
	imageDataToPng,
	createGL,
	loadToGL,
	type ColorTuple,
} from "./imageUtils";

interface ReplacementData {
	original: ColorTuple;
	replacement: ColorTuple;
}

/** Quick helper method to compare two fixed-sized ordered arrays */
const tupleEqual = (a: unknown[], b: unknown[]) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Generate a pixel color map of unique images
 * @param reference - Image to get colors of
 * @param image - Images to check colors exist in
 * @returns Generated pixel color map
 */
function generatePixelMap(
	image: WebGL2RenderingContext,
	reference: WebGL2RenderingContext,
): Record<number, ColorTuple> {
	const imageData = getImageDataAsTuples(image);
	const refData = getImageDataAsTuples(reference);

	console.log(`Generating pixel map for ${refData.length} possible colors...`);
	return refData.reduce<ColorTuple[]>((acc, data, i) => {
		if (
			!data[3] || // not a transparent pixel
			!imageData.some((d) => tupleEqual(d, data)) || // not in image
			Object.values(acc).some((el) => tupleEqual(el, data)) // not already in map
		)
			return acc;
		// faster than spreading
		acc[i] = data;
		return acc;
	}, []);
}

/**
 * Convert a pixel color map into a replacement color map
 * @param pixelMap - Pixel map to load
 * @param source - Image to generate for
 * @returns Replacement color map
 */
function generateReplacementMap(
	pixelMap: Record<number, ColorTuple>,
	template: WebGL2RenderingContext,
): ReplacementData[] {
	const imageData = getImageDataAsTuples(template);

	// can't use array as key so object/map can't be used
	return imageData.reduce<ReplacementData[]>((acc, data, i) => {
		const match = pixelMap[i];
		if (!match) return acc;
		// faster than object spreading
		acc.push({ original: match, replacement: data });
		return acc;
	}, []);
}

/**
 * Apply a generated replacement map to a given image
 * @param replacementMap - Replacement map to apply
 * @param source - Image to edit
 * @returns Edited image
 */
function applyReplacementMap(replacementMap: ReplacementData[], png: WebGL2RenderingContext) {
	// will be putting back so we need original format
	const pixelData = getImageDataAccurate(png);
	for (let i = 0; i < pixelData.data.length; i += 4) {
		// arrays can't be object keys so we need find
		const matched = replacementMap.find((el) =>
			tupleEqual(el.original, Array.from(pixelData.data.slice(i, i + 4))),
		);
		if (matched) {
			pixelData.data[i] = matched.replacement[0];
			pixelData.data[i + 1] = matched.replacement[1];
			pixelData.data[i + 2] = matched.replacement[2];
			pixelData.data[i + 3] = matched.replacement[3];
		}
	}

	return imageDataToPng(pixelData);
}

/**
 * Batch recolor an image to match a series of provided templates
 * @author Evorp
 * @param params - Everything to use
 * @returns Data URLs of results
 */
export default function batchRecolor({
	image,
	reference,
	templates,
}: {
	image: HTMLImageElement;
	reference: HTMLImageElement;
	templates: HTMLImageElement[];
}) {
	// todo: probably move this to a web worker
	const imageGL = loadToGL(image, createGL(image.naturalWidth, image.naturalHeight));
	const refGL = loadToGL(reference, createGL(reference.naturalWidth, image.naturalHeight));

	const pixelMap = generatePixelMap(imageGL, refGL);
	console.log(`Successfully reduced pixel map to ${Object.keys(pixelMap).length} colors!`);

	const zip = new JSZip();
	const templateGL = createGL(reference.naturalWidth, reference.naturalHeight);
	for (const template of templates) {
		// reuse same gl context every time (browsers artificially cap the max)
		loadToGL(template, templateGL);
		const replacementMap = generateReplacementMap(pixelMap, templateGL);
		const recoloredImage = applyReplacementMap(replacementMap, imageGL);
		zip.file(
			template.alt || crypto.randomUUID(),
			// type shenanigans to get around browserify
			new Blob([new Uint8Array(recoloredImage).buffer]),
		);
	}

	return zip.generateAsync({ type: "blob" });
}
