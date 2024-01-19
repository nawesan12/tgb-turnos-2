<script>
	import { goto } from '$app/navigation';
	import { bookingContext } from '../../../store/store';

	export let time;

	let bookingData;

	const unsubscribe = bookingContext.subscribe((value) => (bookingData = value));

	function selectTime() {
		bookingContext.update((booking) => {
			return { ...booking, time: time };
		});
		localStorage.setItem(
			'turno',
			JSON.stringify({
				...bookingData,
				time: time
			})
		);

		goto('/turno/servicio');
	}
</script>

<button on:click={selectTime} class={`slide-in-blurred-bottom`}>
	<div class="checkb">
		<p class="time font-medium text-2xl">{time}</p>
	</div>

	<svg
		width="36"
		height="36"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="#000000"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<circle cx="12" cy="12" r="9" />
		<polyline points="12 7 12 12 15 15" />
	</svg>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		border-radius: 1rem;
		background: #fff;
		width: 100%;
		cursor: pointer;
		color: black;
		border: 1px solid transparent;
	}

	button .checkb {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
