<script>
	import DateItem from '$lib/components/Bookings/DateItem.svelte';
	import GoBack from '$lib/components/GoBack.svelte';

	const navidad = [
		{ year: 2024, month: 12, day: 23 },
		{ year: 2024, month: 12, day: 24 }
	];

	const nuevo = [
		{ year: 2024, month: 12, day: 30 },
		{ year: 2024, month: 12, day: 31 }
	];
</script>

<GoBack />
<section>
	<h2 class="text-center my-8 font-semibold text-2xl">Agenda tu turno para las fiestas!</h2>

	<h3 class="m-4 font-semibold text-xl">Navidad 🎄</h3>
	<div class="flex flex-wrap gap-8 justify-center">
		{#each navidad as date}
			<DateItem {date} />
		{/each}
	</div>

	<h3 class="m-4 font-semibold text-xl">Año Nuevo 🙌❤</h3>
	<div class="flex flex-wrap gap-8 justify-center">
		{#each nuevo as date}
			<DateItem {date} />
		{/each}
	</div>
</section>
