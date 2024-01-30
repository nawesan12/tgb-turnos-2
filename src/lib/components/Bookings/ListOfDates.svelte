<script>
	import { generateActualMonthDates, generateNextMonthDates } from '../../../utils/dates';
	import DateItem from './DateItem.svelte';

	const actualMonthDates = generateActualMonthDates();
	const nextMonthDates = generateNextMonthDates();

	const monthDatesSinceToday = actualMonthDates.filter((date) => date.day >= new Date().getDate());

	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	const actualDay = new Date().getDate();

	const actualMonthName = months[actualMonthDates[0].month - 1];
	const nextMonthName = months[nextMonthDates[0].month - 1];
</script>

<section class="">
	<h2 class="p-4 text-2xl font-semibold my-4">Elegi un dia de {actualMonthName}</h2>
	<ul>
		{#each monthDatesSinceToday as date}
			<DateItem {date} />
		{/each}
	</ul>
	{#if actualDay > 24}
		<h2 class="p-4 text-2xl font-semibold my-4">O de {nextMonthName}</h2>
		<ul>
			{#each nextMonthDates as date}
				<DateItem {date} />
			{/each}
		</ul>
	{/if}
</section>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		width: min(100vw, 1100px);
		margin-inline: auto;
		color: var(--secondary);
		padding: 1rem;
	}
</style>
