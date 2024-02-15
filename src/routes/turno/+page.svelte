<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { onMount } from 'svelte';
	import { userContext } from '../../store/store';
	import { goto } from '$app/navigation';

	onMount(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			goto('/login');
			return;
		}
		userContext.set(JSON.parse(user));
	});
</script>

<TokenAssurance />
<GoBack />
<section class="turno-page">
	<h2 class="px-4 text-2xl font-semibold">Hola, {$userContext.name}</h2>
	<h1 class="text-center text-2xl font-bold mt-8">Agenda tu turno</h1>

	<ListOfDates />
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}
</style>
