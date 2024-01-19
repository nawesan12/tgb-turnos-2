<script>
	import ConfirmBooking from '$lib/components/Checkout/ConfirmBooking.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { bookingContext, userContext } from '../../../store/store';

	let bookingData;
	let userData;
	const unsubscribe = bookingContext.subscribe((value) => {
		bookingData = value;
	});

	const unsubscribeUser = userContext.subscribe((value) => {
		userData = value;
	});
</script>

<GoBack />
<section class="checkout-page">
	<h2 class="font-bold text-3xl text-center mb-5 text-white">Checkout</h2>

	<section class="summary p-4 rounded-sm">
		<div class="">
			<h3 class="text-xl font-bold">Tus datos</h3>
			<section class="p-3">
				<p><b>Nombre:</b> {userData.name}</p>
				<p><b>Email:</b> {userData.email}</p>
				<p><b>Numero:</b> {userData.phone}</p>
			</section>
		</div>

		<div class="turno">
			<h3 class="text-xl font-bold">Tu turno</h3>
			<section class="p-3">
				<p><b>Fecha:</b> {bookingData.date}/{bookingData.month}/{new Date().getFullYear()}</p>
				<p><b>Hora:</b> {bookingData.time}</p>
			</section>
		</div>

		{#if bookingData.description}
			<div class="">
				<h3 class="text-xl font-bold">Especificaciones</h3>
				<section class="p-3">
					<p>{bookingData.description}</p>
				</section>
			</div>
		{/if}

		<div class="">
			<h3 class="text-xl font-bold">Que te vas a hacer?</h3>
			<section class="p-3">
				<p class="text-1xl font-semibold">{bookingData.service}</p>
			</section>
		</div>

		<div class="total">
			<div class="">
				<section class="p-3 font-semibold text-2xl">
					<p>Total:</p>
					<p>${bookingData.price}</p>
				</section>
			</div>
		</div>

		<p class="when text-sm">Sacaste el turno en: {new Date().toLocaleDateString()}</p>
	</section>

	<!-- <p class="text-center text-xs mt-4 text-white">
		* En caso de no asistir al turno sin aviso previo de 1 hora, el dinero no sera devuelto al
		cliente.
	</p> -->
	<ConfirmBooking
		dataToSend={{
			email: userData.email,
			phone: userData.phone,
			name: userData.name,
			service: bookingData.service,
			price: bookingData.price,
			time: bookingData.time,
			date: bookingData.date,
			month: bookingData.month,
			year: bookingData.year,
			serviceId: bookingData.serviceId,
			description: bookingData.description,
			userId: userData.id
		}}
	/>
</section>

<style>
	.checkout-page {
		width: min(90vw, 900px);
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-block: 10vh 0;
		margin-inline: auto;
		color: var(--secondary);
	}

	.summary {
		color: var(--primary);
		border-top: 4px solid var(--orange);
		border-bottom: 4px solid var(--orange);
		border-radius: 1rem;
		position: relative;
		width: min(90vw, 600px);
		padding-block: 2.5rem;
		display: grid;
		grid-template-rows: repeat(2, 1fr) auto;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 0.5rem;
	}

	.summary .when {
		position: absolute;
		bottom: 0.25rem;
		right: 0.5rem;
	}

	.total {
		grid-row: 3;
		grid-column: 1 / 4;
	}

	.total section {
		display: flex;
		justify-content: space-between;
		padding-inline: 1rem;
		border-right: 3px solid var(--orange);
		border-left: 3px solid var(--orange);
		border-radius: 1rem;
	}

	.turno p {
		margin-block: 0.1rem;
		opacity: 0.75;
	}

	@media screen and (max-width: 600px) {
		.summary {
			grid-template-rows: repeat(2, 1fr) auto;
			grid-template-columns: 1fr;
			grid-gap: 0;
		}

		.total {
			grid-row: 6;
			grid-column: 1;
			margin-block: 1rem;
		}

		.total section {
			display: flex;
			justify-content: space-between;
			padding-inline: 1rem;
			border-right: 3px solid var(--orange);
			border-left: 3px solid var(--orange);
			border-radius: 1rem;
		}
	}
</style>
