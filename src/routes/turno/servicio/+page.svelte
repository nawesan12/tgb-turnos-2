<script>
	import GoBack from '$lib/components/GoBack.svelte';
	import ListOfServicesItems from '$lib/components/Services/ListOfServicesItems.svelte';
	import { bookingContext } from '../../../store/store.js';

	export let data;
</script>

<GoBack />
<section class="service-page mx-auto">
	<h2 class="mb-8 text-3xl font-bold">Que te vas a hacer?</h2>

	<ListOfServicesItems services={data.services} />
</section>

<style>
	.service-page {
		width: min(100vw, 800px);
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-block: 10vh 0;
		margin-inline: auto;
	}
</style>
