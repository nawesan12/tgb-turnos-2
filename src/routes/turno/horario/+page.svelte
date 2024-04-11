<script>
	import ListOfTimeItems from '$lib/components/Bookings/ListOfTimeItems.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { bookingContext } from '../../../store/store';

	let bookingData;

	const unsubscribe = bookingContext.subscribe((value) => {
		bookingData = value;
	});
</script>

<GoBack />
<section class="turno-page">
	{#if bookingData.availableTimes.length > 0}
		<ListOfTimeItems times={bookingData.availableTimes} />
	{:else}
		<p class="text-center p-4 font-semibold">No hay turnos para ese dia!</p>
	{/if}
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
