import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import staticAdapter from "@sveltejs/adapter-static";

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess({ script: true }),
			adapter: staticAdapter(),
			alias: { "~": "./src" },
		}),
	],
});
