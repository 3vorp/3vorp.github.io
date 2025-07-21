<script lang="ts">
	import Fa from "svelte-fa";
	const { items }: { items: Required<Url>[] } = $props();
</script>

<footer>
	<div class="footer-bar">
		{#each items as { href, icon, title }}
			<a class="info-text link-hover" target="_blank" rel="noopener noreferrer" {href}>
				<Fa {icon} />
				{title}
			</a>
		{/each}
	</div>
	<p class="info-text bottom">
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

		.info-text {
			font-size: 18px;
		}

		@media screen and (max-width: 900px) {
			display: grid;
			grid-template-columns: repeat(1fr 2); // two columns
			text-align: center;

			.info-text {
				margin-top: 15px;
			}
		}

		@media screen and (max-width: 600px) {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			padding: 20px 10%;
		}
	}

	.bottom {
		text-align: center;
		color: $content-mid;
		&,
		& * {
			font-size: 14px;
		}
	}
</style>
