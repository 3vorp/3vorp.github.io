<div class="container">
	<h1>Commissions</h1>

	<Alert>
		<h3 class="mt-0 mb-2">I am currently on hiatus!</h3>
		<p class="my-0">
			If you're interested in commissioning me, let me know using any of the socials at the bottom
			of this site and I'll let you know if/when I reopen paid work.
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
		{#each commissions as { src, alt, title, date } (src)}
			<Card image={`commission/${src}`} {alt} {title}>
				<span title={new Date(date).toDateString()}>
					<Fa icon={faCalendar} class="mr-1" size="sm" />
					{new Date(date).toLocaleString("en-us", { month: "short", year: "numeric" })}
				</span>
			</Card>
		{/each}
	</div>
	<br /><br />
	<div class="cta-container">
		<h2>Looking for my programming work?</h2>
		<a href="/skills" class="widget btn btn-primary">Check out my recent projects</a>
	</div>
</div>

<script lang="ts">
import Fa from "svelte-fa";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Card from "~/components/Card.svelte";
import Alert from "~/components/Alert.svelte";
import commissions from "~/data/commissions.json";
</script>
