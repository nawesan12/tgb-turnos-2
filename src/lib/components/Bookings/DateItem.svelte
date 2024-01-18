<script>
	export let date;
	export let selected;
	export let set;

	const day = parseInt(date.day);
	const month = parseInt(date.month);
	const year = new Date().getFullYear();

	const formatDateWithLeadingZeros = () => {
		const dateWithLeadingZeros = day < 10 ? `0${day}` : day;
		const monthWithLeadingZeros = month < 10 ? `0${month}` : month;
		return `${dateWithLeadingZeros}/${monthWithLeadingZeros}/${year}`;
	};

	const fixedDateForProduction = formatDateWithLeadingZeros();

	const handleSetDate = () => {
		set(date.day);
		//getTimesForTurnos(date);
	};

	const initials = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

	const selectorForInitial = new Date(year, month - 1, day).getDay();
</script>

<button
	class={`
        ${selected ? 'selected' : ''}  
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
