import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

import type { UserConfig } from "vite";

export default {
	plugins: [
		sveltekit({
			preprocess: vitePreprocess({ script: true }),
			adapter: adapter(),
			alias: {
				"~": "./src",
			},
		}),
	],
} as UserConfig;
