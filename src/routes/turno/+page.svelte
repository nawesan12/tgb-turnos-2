<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { bookingContext } from '../../store/store';
</script>

<GoBack />
<section class="turno-page">
	//<h2 class="px-4 text-2xl font-semibold">Hola, {$bookingContext.clientName}</h2>
	<h1 class="text-center text-2xl font-bold mt-8">Volvemos el 15/01/2025! Felices vacaciones.</h1>

	//<ListOfDates />
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
