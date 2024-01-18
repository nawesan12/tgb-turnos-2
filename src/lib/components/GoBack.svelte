<script>
	import { browser } from '$app/environment';

	function nav_back() {
		if (browser) window.history.back();
	}
</script>

<button class="text-2xl font-bold m-4" on:click={nav_back}> &larr; </button>
