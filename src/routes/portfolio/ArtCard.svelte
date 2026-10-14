<div class="card">
	{#if image}
		<div class="card-img-container">
			<img src={image} {alt} class="card-img" />
		</div>
	{/if}
	<div class="card-body-container">
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
		{#if showDownload}
			<span class="spacer"></span>
			<a
				class="widget btn btn-icon"
				style="height: 32px"
				href={image}
				download={image.split("/").at(-1)}
			>
				<Fa icon={faDownload} />
			</a>
		{/if}
	</div>
</div>

<script lang="ts">
import { faCalendar, faDownload } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";

const {
	image,
	alt,
	title,
	date,
	showDownload = false,
}: {
	image: string;
	alt?: string;
	title?: string;
	date?: Date;
	showDownload?: boolean;
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

.card-body-container {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: $padding-container;
}

.card-title {
	font-family: $font-body;
	font-weight: $weight-bold;
	font-size: 24px;
}
.card-img-container {
	width: 100%;
	aspect-ratio: 16 / 9;
	display: flex;
	align-items: center;
	justify-content: center;
	background: $fg-light;
	border-radius: $border-radius;
}

.card-text {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}

.card-img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
</style>
