<script>
	import { goto } from '$app/navigation';
	import { send } from '@emailjs/browser';
	import { toast } from 'svelte-sonner';

	export let dataToSend;

	const sendTurnoAndCheckout = async () => {
		const response = await fetch(`/api/confirm-booking`, {
			method: 'POST',
			body: JSON.stringify(dataToSend),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();

		if (data.error) {
			toast.error('Ha habido un error confirmando el turno.');
		}

		toast.success('Turno confirmado! Revisa tu email.');

		const mail = {
			to_name: dataToSend.name,
			clientEmail: dataToSend.email,
			service: dataToSend.service,
			date: String(dataToSend.date + '/' + dataToSend.month + '/' + new Date().getFullYear()),
			time: dataToSend.time
		};

		send('service_kwpevqy', 'template_qhx76f9', mail, '2ucjbq62dBKzsL0bK');

		goto('/');
	};
</script>

<button on:click={sendTurnoAndCheckout}>Confirmar Turno</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(90vw, 200px);
		background: var(--secondary);
		color: var(--primary);
		font-size: 1.1rem;
		font-weight: bold;
		padding: 0.5rem;
		border-radius: 0.5rem;
		margin: 5vh auto;
		border-right: 3px solid #ff6f20;
		border-left: 3px solid #ff6f20;
	}

	button:hover {
		box-shadow: 0 0 0.1rem 0.1rem var(--orange);
	}
</style>
