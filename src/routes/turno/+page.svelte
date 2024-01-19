<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
</script>

<GoBack />
<section class="turno-page">
	<h2 class="px-4 text-2xl font-semibold">Hola, Nawe!</h2>
	<h1 class="text-center text-2xl font-bold">Agenda tu turno</h1>

	<ListOfDates />
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
