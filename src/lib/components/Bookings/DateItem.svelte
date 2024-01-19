<script>
	import { goto } from '$app/navigation';
	import { bookingContext } from '../../../store/store';

	export let date;

	const day = parseInt(date.day);
	const month = parseInt(date.month);
	const year = new Date().getFullYear();

	const formatDateWithLeadingZeros = () => {
		const dateWithLeadingZeros = day < 10 ? `0${day}` : day;
		const monthWithLeadingZeros = month < 10 ? `0${month}` : month;
		return `${dateWithLeadingZeros}/${monthWithLeadingZeros}/${year}`;
	};

	let bookingData;

	const unsubscribe = bookingContext.subscribe((value) => {
		bookingData = value;
	});

	function saveDateLocally(availableTimes) {
		bookingContext.update((booking) => {
			return { ...booking, date: date.day, month: date.month, availableTimes: [...availableTimes] };
		});
		localStorage.setItem(
			'turno',
			JSON.stringify({
				...bookingData,
				date: date.day,
				year: new Date().getFullYear(),
				month: date.month,
				availableTimes: [...availableTimes]
			})
		);
	}

	const fixedDateForProduction = formatDateWithLeadingZeros();

	const getTimesForTurnos = async () => {
		const response = await fetch(`http://localhost:5173/api/check-available-times`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ date: fixedDateForProduction })
		});
		const data = await response.json();

		saveDateLocally(data.times);

		goto('/turno/horario');
	};

	const handleSetDate = () => {
		getTimesForTurnos();
	};

	const initials = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

	const selectorForInitial = new Date(year, month - 1, day).getDay();
</script>

<button
	class={`
        ${
					day % 3 === 0
						? 'slide-in-blurred-tr'
						: day % 4 === 0
							? 'slide-in-blurred-bl'
							: day % 2 === 0
								? 'slide-in-blurred-bottom'
								: day % 2 === 1
									? 'slide-in-blurred-top'
									: ''
				}
      `}
	on:click={handleSetDate}
>
	{initials[selectorForInitial]} &nbsp;{' '}
	{date.day < 10 ? '0' + date.day : date.day}/
	{date.month < 10 ? '0' + date.month : date.month}
</button>

<style>
	button {
		border-radius: 0.75rem;
		height: 3rem;
		width: 8rem;
		background-color: #fff;
		color: black;
		display: grid;
		place-items: center;
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 0.1s ease;
		cursor: pointer;
		font-weight: 500;
		padding-inline: 1rem;
	}

	button {
		letter-spacing: 0.05rem;
	}

	.selected {
		box-shadow: 0 0 0.25rem 2px var(--special);
		border: 1px solid var(--special);
		transform: scale(1.1);
	}
</style>
