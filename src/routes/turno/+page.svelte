<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { userContext } from '../../store/store';

	let user;
	const unsubscribe = userContext.subscribe((value) => {
		user = value;
	});
</script>

<TokenAssurance>
	<GoBack />
	<section class="turno-page">
		<h2 class="px-4 text-2xl font-semibold">Hola, {user.name}</h2>
		<h1 class="text-center text-2xl font-bold mt-8">Agenda tu turno</h1>

		<ListOfDates />
	</section>
</TokenAssurance>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
