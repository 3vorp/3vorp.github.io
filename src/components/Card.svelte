<div class="card">
	{#if image}
		<div class="card-img-container">
			<img class="card-img" src={image} alt={alt || "commission image"} />
		</div>
	{/if}
	<div class="card-text">
		{#if title}
			<!-- add a tiny bit of right margin to cheat good looking margin -->
			<h3 class="card-title mt-0 mb-1">{title}</h3>
		{/if}
		{#if children}
			<p class="my-0">
				{@render children()}
			</p>
		{/if}
	</div>
</div>

<script lang="ts">
import type { Snippet } from "svelte";

let {
	image,
	alt,
	title,
	children,
}: {
	image: string;
	alt?: string;
	title?: string;
	children?: Snippet;
} = $props();
</script>

<style lang="scss">
@use "~/css/variables.scss" as *;

.card {
	max-width: 100%;
	border-radius: 4px;
	background: $bg-mid;
	filter: drop-shadow($drop-shadow);
}

.card-text {
	padding: 1rem;
}

.card-title {
	font-family: $font-subtitle;
	font-size: 24px;
}

.card-img-container {
	width: 100%;
	height: 240px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: $fg-light;
	border-radius: 4px;
	padding: 1rem;
}

.card-img {
	height: 100%;
	width: 100%;
	object-fit: contain;
	filter: drop-shadow($drop-shadow);
}
</style>
