<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
	tabindex="0"
	class={["card", { "clickable-card": onclick }]}
	{onclick}
	onkeydown={({ key }) => ["Enter", " "].includes(key) && onclick?.()}
>
	{#if image}
		<div class="card-img-container">
			<img src={image} {alt} class={["card-img", { "pa-4": padImage }]} />
		</div>
	{/if}
	<div class="card-body">
		{#if title}
			<h3 class="my-0">{title}</h3>
		{/if}
		{#if date}
			<p class="card-text mb-0 mt-1" title={new Date(date).toDateString()}>
				<Fa icon={faCalendar} class="mr-2" size="sm" />
				{new Date(date).toLocaleString("en-us", { month: "short", year: "numeric" })}
			</p>
		{/if}
	</div>
</article>

<script lang="ts">
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";

const {
	image,
	alt,
	title,
	date,
	padImage = false,
	onclick,
}: {
	image: string;
	alt?: string;
	title?: string;
	date?: Date;
	padImage?: boolean;
	onclick?: () => void;
} = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.clickable-card {
	transition: all $transition;
	cursor: pointer;
	&:hover,
	&:focus {
		transform: scale(1.05);
	}
	&:active {
		transform: scale(0.95);
	}
}

.card-text {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}

.card-img-container {
	width: 100%;
	aspect-ratio: 16 / 9;
	display: flex;
	align-items: center;
	justify-content: center;
	background: $fg-light;
	border-radius: $border-radius;
	position: relative;
}

.card-img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
</style>
