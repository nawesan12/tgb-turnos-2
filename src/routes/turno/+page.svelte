<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { bookingContext } from '../../store/store';
</script>

<GoBack />
<section class="turno-page">
	<h2 class="px-4 text-2xl font-semibold">Hola, {$bookingContext.name}</h2>
	<ListOfDates />
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
