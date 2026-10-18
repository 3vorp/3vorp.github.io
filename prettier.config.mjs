/** @type {import("prettier").Config} */
export default {
	semi: true,
	trailingComma: "all",
	singleQuote: false,
	printWidth: 100,
	useTabs: true,
	bracketSpacing: true,
	arrowParens: "always",
	plugins: ["prettier-plugin-svelte"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
				svelteIndentScriptAndStyle: false,
				svelteSortOrder: "options-markup-scripts-styles",
			},
		},
	],
};
