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

<button on:click={selectService} class="h-auto pb-4 rounded-lg bg-gray-200 roll-in-blurred-bottom">
	<div class="flex gap-8 items-center flex-col">
		<strong
			class="rounded border border-orange-600 bg-orange-600 px-3 py-1.5 text-xl font-bold text-white"
		>
			{name}
		</strong>
		<section class="flex justify-center flex-col w-full">
			<img src={image} class="h-40" alt="" />
			<footer>
				<b class="text-xl">${price}</b>
			</footer>
		</section>
	</div>
</button>

<style>
	button {
		color: black;
		width: 100%;
	}

	button p {
		opacity: 0.8;
	}
</style>
