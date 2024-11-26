<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { bookingContext } from '../../store/store';
</script>

<GoBack />
<section class="turno-page">
	<h2 class="px-4 text-2xl font-semibold">Hola, {$bookingContext.clientName}</h2>
	<h1 class="text-center text-2xl font-bold mt-8">Agenda tu turno</h1>

	<section class="bg-white p-4 font-semibold text-xl text-black m-4 mb-0 rounded-lg">
		<p class="text-center my-4">Buscas turno para las fiestas? 🎄</p>

		<a
			href="/turno/fiestas"
			class="bg-orange-600 rounded-lg p-2 text-white mt-8 w-full text-center"
		>
			Agendalo Aca
		</a>
	</section>

	<ListOfDates />
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
