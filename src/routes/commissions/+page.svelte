<div class="container">
	<h1>Commissions</h1>
	<p class="text-center">Under Construction!</p>

	<Alert>
		<p class="my-0">
			Note: I am currently on hiatus for commissions—if you're interested in commissioning me, let
			me know using any of the socials at the bottom of this site and I'll let you know if/when I
			reopen paid work.
		</p>
	</Alert>

	<h2>Information</h2>

	<p>
		I've taken a number of commissions for wallpapers, profile pictures, and video game-related
		material online in the past. I primarily focus on low-poly digital art, with an emphasis on
		pixel graphics and simplified models, having over five years of experience working in this
		domain.
	</p>

	<h2>Previous Commissions</h2>

	<div class="grid-3">
		{#each commissions as { src, alt, type, date }}
			<Card image={`commission/${src}`} {alt} title={type}>
				<Fa icon={faClockRotateLeft} size="xs" />
				<span title={date.toDateString()}>
					{date.toLocaleString("en-us", { month: "short", year: "numeric" })}
				</span>
			</Card>
		{/each}
	</div>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "~/components/Card.svelte";
import Alert from "~/components/Alert.svelte";

// me when data driven code
const commissions: Commission[] = [
	{
		src: "cat.gif",
		alt: "cat",
		type: "Texture Collection",
		date: new Date("2023-12-13"),
	},
	{
		src: "skull.gif",
		alt: "skull",
		type: "Profile Picture",
		date: new Date("2023-10-30"),
	},
	{
		src: "zombie.png",
		alt: "zombie",
		type: "Video Game Texture",
		date: new Date("2022-11-15"),
	},
	{
		src: "computer.png",
		alt: "computer",
		type: "Video Game Avatar",
		date: new Date("2022-04-10"),
	},
	{
		src: "dragon.png",
		alt: "dragon",
		type: "Video Game Avatar",
		date: new Date("2022-04-10"),
	},
];
</script>
