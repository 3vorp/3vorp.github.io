<div class="main-banner">
	<img src="banner/main.jpg" alt="evorp banner" />
</div>

{#each Object.entries(categories) as [key, category]}
	<h1 class="container text-center">{key}</h1>
	{#each category as { title, description, href, image, langs, frameworks }, i}
		<div class={i % 2 === 0 ? "" : "secondary-background"}>
			<div class="container project-container">
				<div class="project-info">
					<a class="h2" {href} target="_blank" rel="noopener noreferrer">
						{title}
					</a>
					<p class="project-description">{description}</p>
					<ul>
						{#if langs}
							<li>Languages: {langs.join(", ")}</li>
						{/if}
						{#if frameworks}
							<li>Frameworks: {frameworks.join(", ")}</li>
						{/if}
					</ul>
				</div>
				<a {href} target="_blank" rel="noopener noreferrer">
					<img class="project-image" src={image} alt={`${title} logo`} loading="lazy" />
				</a>
			</div>
		</div>
	{/each}
{/each}

<a href="/gamble" class="text-center mt-3">
	Gamble your savings away until I add more stuff to this site!
</a>

<script lang="ts">
interface ProjectCategory {
	title: string;
	description: string;
	href: string;
	image: string;
	langs?: string[];
	frameworks?: string[];
}

const categories: Record<string, ProjectCategory[]> = {
	"My projects": [
		{
			title: "convert-pack",
			description:
				"Convert a Minecraft resource pack between versions and editions with no compromises using a powerful command-line interface.",
			href: "https://npmjs.com/package/convert-pack",
			image: "https://github.com/user-attachments/assets/fb7511ed-8824-42cb-9166-9c17a5e08b49",
			langs: ["JavaScript"],
		},
		{
			title: "vdom-mini",
			description:
				"250-line virtual DOM implementation from scratch. Extremely lightweight and optimized for progressive enhancement.",
			href: "https://npmjs.com/package/vdom-mini",
			image: "https://github.com/user-attachments/assets/996af12d-bbc6-44dc-a108-2712e4b38714",
			langs: ["JavaScript"],
		},
	],
	"Projects I've contributed to": [
		{
			title: "firestorm-db",
			description:
				"Self hosted Firestore-like database with API endpoints based on micro bulk operations.",
			href: "https://npmjs.com/package/firestorm-db",
			image:
				"https://raw.githubusercontent.com/TheRolfFR/firestorm-db/refs/heads/main/img/firestorm-512.png",
			langs: ["JavaScript", "PHP"],
		},
		{
			title: "Faithful Web Application",
			description:
				"Official web application for the Faithful Resource Pack project. Features a Minecraft texture gallery with detailed information about contributions, texture uses, and more, add-on submission with an in-built review system and file hosting, and an administrator panel to safely edit the texture, user, and contribution databases directly.",
			href: "https://webapp.faithfulpack.net",
			image:
				"https://database.faithfulpack.net/images/branding/logos/transparent/hd/dev_logo.png?w=128",
			langs: ["JavaScript", "HTML", "CSS"],
			frameworks: ["Vue 2", "Vuetify Components", "Vite"],
		},
		{
			title: "Faithful API",
			description:
				"Public RESTful API for Faithful's texture database, add-on submission, and more. Uses the in-house developed firestorm-db project to power file uploading, bulk editing, and statistic aggregation, and the tsoa framework to generate REST endpoints with in-built Discord authentication.",
			href: "https://api.faithfulpack.net/docs",
			image:
				"https://database.faithfulpack.net/images/branding/logos/transparent/hd/mods_logo.png?w=128",
			langs: ["TypeScript", "JavaScript", "(Indirectly) PHP"],
			frameworks: ["firestorm-db", "tsoa", "Swagger UI"],
		},
		{
			title: "Faithful Website",
			description:
				"Content-centric main website for the resource packs themselves. Features add-on search and pages, news articles and posts, and download pages with rich metadata and server-side rendering.",
			href: "https://faithfulpack.net",
			image:
				"https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=128",
			langs: ["TypeScript", "JavaScript", "HTML", "CSS"],
			frameworks: ["Nuxt 4", "Vue 3", "Vuetify Components", "Bootstrap CSS"],
		},
		{
			title: "Faithful Docs",
			description:
				"Guides for texture making, submitting add-ons, and more. Powered by the VitePress framework, which converts markdown files into rendered HTML along with custom styling.",
			href: "https://docs.faithfulpack.net",
			image: "https://github.com/user-attachments/assets/71700b2f-62ec-4e33-83cb-89bf44f8ea22",
			langs: ["TypeScript", "Markdown"],
			frameworks: ["VitePress", "Vue 3"],
		},
		{
			title: "CompliBot Submissions",
			description:
				"Discord bot with a fully automated texture pushing and submission system for the Faithful Discord servers. Automatically creates and retrieves texture submissions for each resource pack and schedules daily texture pushes with upvoted results.",
			href: "https://github.com/faithful-resource-pack/complibot-submissions",
			image:
				"https://database.faithfulpack.net/images/branding/logos/transparent/hd/complibot_submissions_logo.png?w=128",
			langs: ["TypeScript"],
			frameworks: ["Discord.js", "Octokit"],
		},
		{
			title: "CompliBot Commands",
			description:
				"Provides a Discord interface for the Faithful API using slash commands and buttons to make viewing textures and contributions easier for end users.",
			href: "https://github.com/faithful-resource-pack/complibot-commands",
			image:
				"https://database.faithfulpack.net/images/branding/logos/transparent/hd/complibot_logo.png?w=128",
			langs: ["TypeScript"],
			frameworks: ["Discord.js", "Octokit"],
		},
	],
};
</script>

<style lang="scss">
@use "../css/variables.scss" as *;

.main-banner {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
	img {
		max-width: 100%;
		max-height: 50vw;
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		@media screen and (max-width: 1200px) {
			max-width: 130%;
		}
		@media screen and (max-width: 800px) {
			max-width: 160%;
		}
	}
}
// override container class for flex content
.project-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 40px;
	padding-bottom: 40px;
	gap: 40px;

	@media screen and (max-width: 576px) {
		// center content and display vertically on mobile
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
}

@media screen and (max-width: 576px) {
	.project-description {
		margin-left: 30px;
		margin-right: 30px;
	}
}

.project-image {
	height: 256px;
	transition: all 0.5s ease;
	&:hover {
		transform: scale(1.1);
	}
	filter: drop-shadow($drop-shadow);
}

.secondary-background {
	background: $bg-mid;
}
</style>
