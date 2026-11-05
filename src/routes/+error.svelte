<div class="container all-center">
	<h1>{page.status}: {page.error?.message || "Unknown Error"}</h1>
	<p class="text-center">
		The page you requested doesn't exist, is currently nonfunctioning, or has been renamed!
		<br />
		For a list of all available pages, use the site footer at the bottom of this page.
	</p>
	<div class="button-row my-5">
		<a class="btn btn-primary" href="/">
			<Fa icon={faHome} />
			Go Home
		</a>
		<a class="btn" href="/games/gamble">
			<Fa icon={faDice} />
			Go Gambling
		</a>
	</div>
</div>

<script lang="ts">
import { page } from "$app/state";
import { faHome, faDice } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";
</script>
