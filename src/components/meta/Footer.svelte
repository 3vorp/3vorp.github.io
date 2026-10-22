<footer class="mt-4">
	<div class="container footer-container">
		<div class="footer-column footer-information">
			<a href="/" class="navigation-link mb-2">
				<img
					class="footer-wordmark zoom-hitbox zoom-affected"
					src="/banner/footer.png"
					loading="lazy"
					alt="Evorp's Wordmark"
					width="240"
				/>
			</a>
			<div class="footer-socials">
				{#each socials as { href, alt, icon } (href)}
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer"
						title={alt}
						class="navigation-link footer-link"
					>
						<Fa {icon} size="1.25x" />
					</a>
				{/each}
			</div>
			<div class="spacer"></div>
			<p class="my-0">&copy; 2022–{new Date().getFullYear()} Evorp</p>
		</div>
		<div class="footer-item-container">
			{#each categories as { title, items } (title)}
				<div class="footer-column">
					<h3 class="my-0 mr-2">{title}</h3>
					{#each items as { name, href } (href)}
						<a
							class="navigation-link footer-link"
							{href}
							target={isExternal(href) ? "_blank" : ""}
							rel={isExternal(href) ? "noopener noreferrer" : ""}
						>
							{name}
							{#if isExternal(href)}
								<sup class="footer-external-link">
									<Fa icon={faArrowUpRightFromSquare} size="0.6x" />
								</sup>
							{/if}
						</a>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<small class="footer-info-text">
		This website was made using the <a
			href="https://svelte.dev/"
			target="_blank"
			rel="noopener noreferrer"
		>
			SvelteKit
		</a>
		framework. View the source code
		<a href="https://github.com/3vorp/3vorp.github.io" target="_blank" rel="noopener noreferrer"
			>here</a
		>!
	</small>
</footer>

<script lang="ts">
import Fa from "svelte-fa";
import {
	faDiscord,
	faReddit,
	faSteam,
	faTumblr,
	faTwitter,
	faYoutube,
	type IconDefinition,
} from "@fortawesome/free-brands-svg-icons";

import categories from "#data/footer.json";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface SocialMedia {
	href: string;
	icon: IconDefinition;
	alt: string;
}

const socials: SocialMedia[] = [
	{ href: "https://discord.com/users/360249987927638016", alt: "Discord", icon: faDiscord },
	{ href: "https://twitter.com/3vorp", alt: "Twitter", icon: faTwitter },
	{ href: "https://reddit.com/u/3vorp", alt: "Reddit", icon: faReddit },
	{ href: "https://tumblr.com/evorp", alt: "Tumblr", icon: faTumblr },
	{ href: "https://www.youtube.com/@evorp", alt: "YouTube", icon: faYoutube },
	{ href: "https://steamcommunity.com/id/3vorp/", alt: "Steam", icon: faSteam },
];

const isExternal = (link: string) => link.startsWith("http");
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

footer {
	background: $fg-dark;
	padding: $padding-container;
	text-align: center;
	display: flex;
	flex-flow: column nowrap;
	box-shadow: inset $drop-shadow;
}

// container for left column as well as the others for better wrapping
.footer-container {
	display: flex;
	flex-flow: row nowrap;
	// stretch info row to fit size of others
	align-items: stretch;
	justify-content: space-between;
	gap: 4rem;
	// override container class (we only need the side padding from it)
	padding-bottom: $padding-container !important;
	padding-top: $padding-container !important;
	text-align: left;
}

// container for just the link columns
.footer-item-container {
	flex-grow: 1;
	display: flex;
	flex-flow: row nowrap;
	align-items: start;
	justify-content: space-between;
	gap: 2rem;
}

.footer-column {
	display: flex;
	flex-flow: column nowrap;
	align-items: start;
	justify-content: start;
	gap: 0.5rem;
}

.footer-link {
	color: $content-mid;
	font-size: $size-body;
}

.footer-external-link {
	vertical-align: top;
	position: relative;
	top: -0.25rem;
	color: $content-dark;
}

.footer-information {
	color: $content-mid;
	justify-content: space-between;
}

.footer-socials {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.footer-info-text {
	font-size: $size-body-small;
	color: $content-dark;
	padding: $padding-container;
}

@media screen and (max-width: $breakpoint-md) {
	.footer-container {
		// remove stretch from info columns
		align-items: start;
		gap: 3rem;
	}
	// two footer columns on side
	.footer-item-container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
}

@media screen and (max-width: $breakpoint-sm) {
	// center info/link areas as rows, keep two columns for links
	.footer-container {
		flex-flow: column nowrap;
		align-items: center;
		gap: 2rem;
	}
	// since info is now on a line of its own center align looks better
	.footer-information {
		align-items: center;
	}
}
</style>
