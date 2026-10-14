<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div role="article" tabindex="0" class={["card", onclick && "clickable-card"]} {onclick}>
	{#if image}
		<div class="card-img-container">
			<img src={image} {alt} class="card-img" />
		</div>
	{/if}
	<div class="card-body">
		{#if title}
			<h3 class="card-title mt-0 mb-1">{title}</h3>
		{/if}
		{#if date}
			<p class="card-text my-0" title={new Date(date).toDateString()}>
				<Fa icon={faCalendar} class="mr-2" size="sm" />
				{new Date(date).toLocaleString("en-us", { month: "short", year: "numeric" })}
			</p>
		{/if}
	</div>
</div>

<script lang="ts">
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";

const {
	image,
	alt,
	title,
	date,
	onclick,
}: {
	image: string;
	alt?: string;
	title?: string;
	date?: Date;
	onclick?: () => void;
} = $props();
</script>

<style lang="scss">
@use "#css/variables.scss" as *;

.card {
	max-width: 100%;
	border-radius: $border-radius;
	background: $bg-mid;
	filter: drop-shadow($drop-shadow);
	overflow: hidden;
}

.clickable-card {
	transition: all 0.25s ease;
	cursor: pointer;
	&:hover,
	&:focus {
		transform: scale(1.05);
	}
	&:active {
		transform: scale(0.95);
	}
}

.card-body {
	display: flex;
	flex-flow: column nowrap;
	padding: $padding-container;
}

.card-title {
	font-family: $font-body;
	font-weight: $weight-bold;
	font-size: 24px;
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
