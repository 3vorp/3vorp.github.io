<footer>
	<div class="footer-bar">
		{#each items as { href, icon, title }}
			<a class="navigation-link footer-link" target="_blank" rel="noopener noreferrer" {href}>
				<Fa {icon} />
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
@use "../css/variables.scss" as *;

footer {
	background-color: $fg-dark;
	margin-top: 50px;
}

.footer-bar {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	padding: 20px 10%;
}

@media screen and (max-width: 900px) {
	.footer-bar {
		display: grid;
		grid-template-columns: repeat(1fr 2); // two columns
		text-align: center;
	}
	.footer-link {
		margin-top: 15px;
	}
}

@media screen and (max-width: 600px) {
	.footer-bar {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding: 20px 10%;
	}
}

.footer-info-text {
	font-family: $font-subtitle;
	text-align: center;
	color: $content-mid;
	&,
	& * {
		font-size: 14px;
	}
}
</style>
