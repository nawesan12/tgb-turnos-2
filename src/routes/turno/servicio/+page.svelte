<script>
	import GoBack from '$lib/components/GoBack.svelte';
	import ListOfServicesItems from '$lib/components/Services/ListOfServicesItems.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { bookingContext } from '../../../store/store.js';

	export let data;

	// Extract month and date from the bookingContext
	$: month = $bookingContext.month; // Assuming bookingContext.month exists
	$: date = $bookingContext.date; // Assuming bookingContext.date exists

	// Determine services to display
	$: servicesToDisplay =
		month === 12 && [24, 23, 30, 31].includes(date) ? data.holidayServices : data.services;

	console.log(data);
	console.log($bookingContext);
</script>

<GoBack />
<section class="service-page mx-auto">
	<h2 class="mb-8 text-3xl font-bold">Que te vas a hacer?</h2>

	<!-- Use the computed servicesToDisplay -->
	<ListOfServicesItems services={servicesToDisplay} />
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
