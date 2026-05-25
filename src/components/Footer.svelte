<footer>
	<div class="footer-bar">
		{#each items as { href, icon, title }}
			<a class="navigation-link footer-link" target="_blank" rel="noopener noreferrer" {href}>
				<Fa {icon} class="mr-2" />
				{title}
			</a>
		{/each}
	</div>
	<p class="footer-info-text">
		This website was made using the <a
			href="https://svelte.dev/"
			target="_blank"
			rel="noopener noreferrer"
		>
			SvelteKit
		</a>
		framework. View the source
		<a href="https://github.com/3vorp/3vorp.github.io" target="_blank" rel="noopener noreferrer"
			>here</a
		>!
	</p>
</footer>

<script lang="ts">
import Fa from "svelte-fa";
const { items }: { items: Required<Url>[] } = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

footer {
	background-color: $fg-dark;
	margin-top: 50px;
}

.footer-bar {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	align-items: center;
	padding: 0 10%;
	height: 64px;
}

.footer-info-text {
	text-align: center;
	padding: 0 10% 20px 10%;
	margin: 0;
	color: $content-mid;
	font-size: 16px;
}

@media screen and (max-width: 900px) {
	.footer-bar {
		display: grid;
		// two columns
		grid-template-columns: repeat(3, 1fr);
		text-align: center;
		height: auto;
		padding: 10px 10%;
	}
	.footer-link {
		margin-top: 16px;
	}
	.footer-info-text {
		padding: 20px 10%;
	}
}

@media screen and (max-width: 600px) {
	.footer-bar {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
