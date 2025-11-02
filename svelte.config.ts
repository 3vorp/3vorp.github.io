import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import type { Config } from "@sveltejs/kit";

export default {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
	},
} as Config;
