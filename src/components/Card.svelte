<div class="card">
	{#if image}
		<div class="card-img-container">
			<img src={image} {alt} class="card-img" />
		</div>
	{/if}
	<div class="card-body">
		{#if title}
			<h3 class="card-title mt-0 mb-1">{title}</h3>
		{/if}
		{#if children}
			<p class="card-text my-0">
				{@render children()}
			</p>
		{/if}
	</div>
</div>

<script lang="ts">
import type { Snippet } from "svelte";

const {
	image,
	alt = "commission image",
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
	border-radius: $border-radius;
	background: $bg-mid;
	filter: drop-shadow($drop-shadow);
}

.card-body {
	padding: $padding-container;
}

.card-title {
	font-family: $font-body;
	font-weight: $weight-bold;
	font-size: 24px;
}

.card-text {
	font-size: 18px;
}

.card-img-container {
	width: 100%;
	height: 240px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: $fg-light;
	border-radius: $border-radius;
	padding: $padding-container;
}

.card-img {
	height: 100%;
	width: 100%;
	object-fit: contain;
	filter: drop-shadow($drop-shadow);
}
</style>
