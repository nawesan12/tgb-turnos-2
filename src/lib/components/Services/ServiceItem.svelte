<script>
	import { goto } from '$app/navigation';
	import { bookingContext } from '../../../store/store';

	export let id;
	export let price;
	export let name;
	export let image;

	let bookingData;

	const unsubscribe = bookingContext.subscribe((value) => (bookingData = value));

	function selectService() {
		bookingContext.update((booking) => {
			return { ...booking, price: price, service: name, serviceId: id };
		});
		localStorage.setItem(
			'turno',
			JSON.stringify({
				...bookingData,
				price: price,
				service: name,
				serviceId: id
			})
		);

		goto('/turno/descripcion');
	}
</script>

<button
	on:click={selectService}
	class="flex flex-col items-center justify-between gap-5 roll-in-blurred-bottom"
>
	<div class="content flex flex-col items-center gap-4">
		<h3 class="text-2xl font-bold">{name}</h3>
		<img src={image} alt="" />
		<p class="text-2xl font-bold">${price}</p>
	</div>
</button>

<style>
	button {
		color: black;
		width: 100%;
	}

	div {
		padding: 2rem 3rem;
		border-radius: 1rem;
		cursor: pointer;
		background: #fff;
		color: #000;
		border-bottom: 4px solid var(--orange);
		border-top: 4px solid var(--orange);
		transition: all 0.3s ease;
	}

	button p {
		opacity: 0.8;
	}

	button h3 {
		text-align: center;
	}
</style>
