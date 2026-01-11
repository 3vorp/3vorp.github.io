import { PNG } from "pngjs/browser";
import { Buffer } from "buffer";

export type ImageSource = HTMLImageElement;
export type ColorTuple = [number, number, number, number];

/**
 * Nicer formatted ImageData for getting data
 * @param ctx - Where to get data from
 * @returns Array of [r, g, b, a] tuples
 */
export const getImageDataAsTuples = (canvas: WebGL2RenderingContext): ColorTuple[] =>
	getImageDataAccurate(canvas).data.reduce((acc, cur, i) => {
		if (i % 4 === 0) acc.push([]);
		acc.at(-1)?.push(cur);
		return acc;
	}, [] as any[]);

/**
 * Helper method to load directly as a Canvas rather than as an Image
 * @param source - Any loadable image
 * @returns Loaded canvas context
 */
export function createGL(width: number, height: number): WebGL2RenderingContext {
	const canvas = new OffscreenCanvas(width, height);
	const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
	if (gl === null)
		throw new Error(
			"Failed to get WebGL instance (there are probably too many active images loaded).",
		);
	return gl;
}

export function loadToGL(image: ImageSource, gl: WebGL2RenderingContext) {
	gl.canvas.width = image.naturalWidth;
	gl.canvas.height = image.naturalWidth;
	// reset canvas
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

	// https://stackoverflow.com/a/60564905/20327257
	gl.activeTexture(gl.TEXTURE0);
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	const framebuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

	// so it can be changed with createGL
	return gl;
}

export function getImageDataAccurate(gl: WebGL2RenderingContext): ImageData {
	const data = new ImageData(gl.canvas.width, gl.canvas.height);
	gl.readPixels(0, 0, gl.canvas.width, gl.canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, data.data);
	return data;
}

export function imageDataToPng(imageData: ImageData): Buffer {
	const png = new PNG({
		width: imageData.width,
		height: imageData.height,
	});
	png.data = Buffer.from(imageData.data);
	png.pack();
	return PNG.sync.write(png);
}
