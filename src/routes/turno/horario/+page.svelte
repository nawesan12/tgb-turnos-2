<script>
	import ListOfTimeItems from '$lib/components/Bookings/ListOfTimeItems.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { bookingContext } from '../../../store/store';

	let bookingData;

	const unsubscribe = bookingContext.subscribe((value) => {
		bookingData = value;
	});
</script>

<TokenAssurance>
	<GoBack />
	<section class="turno-page">
		{#if bookingData.availableTimes.length > 0}
			<ListOfTimeItems times={bookingData.availableTimes} />
		{:else}
			<p class="text-center p-4 font-semibold">No hay turnos para ese dia!</p>
		{/if}

		<div class="choice">
			<!-- {turno.date ? (
			  <>
			  <h2 className="p-4 text-2xl font-semibold">Tu turno</h2>
			  <section className="turno-info flex gap-4 px-4">
				<p className="selected-day px-2">Dia: {formatDate(turno.month + "/" + turno.date + "/" + new Date().getFullYear())}</p>
				{turno.time ? <p className="px-2 selected-time selected-day">Horario: {turno.time}</p> : null}
			  </section>
			  </>
			) : null} -->
		</div>

		<!-- {
			turno.date && turno.time ? <GoNextPage href="/turno/servicio" callback={handleSaveTurno}/> : null 
		  } -->
	</section>
</TokenAssurance>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}

	.choice {
		font-size: 1rem;
		font-weight: 500;
	}
</style>
