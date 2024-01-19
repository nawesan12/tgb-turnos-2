<script>
	import { generateActualMonthDates } from '../../../utils/dates';
	import DateItem from './DateItem.svelte';

	const actualMonthDates = generateActualMonthDates();

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

	const actualMonthName = months[actualMonthDates[0].month - 1];
</script>

<section class="">
	<h2 class="p-4 text-2xl font-semibold">Elegi un dia</h2>
	<h3 class="p-4 px-8 text-2xl font-semibold text-white block">{actualMonthName}</h3>
	<ul>
		{#each monthDatesSinceToday as date}
			<DateItem {date} />
		{/each}
	</ul>
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
