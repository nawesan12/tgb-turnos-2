<script>
	import { send } from '@emailjs/browser';

	export let dataToSend;

	console.log(dataToSend);

	const sendTurnoAndCheckout = async () => {
		const response = await fetch(`https://turnos.gorositostudio.com/api/booking/book`, {
			method: 'POST',
			body: JSON.stringify(dataToSend),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();

		if (data.error) {
			alert('Ha habido un error confirmando el turno.');
		}

		// setTurno({ ...turno, booked: data.savedBooking });

		if (data.success === true) {
			const mail = {
				to_name: dataToSend.name,
				clientEmail: dataToSend.email,
				service: dataToSend.service,
				date: String(dataToSend.date + '/' + dataToSend.month + '/' + dataToSend.year),
				time: dataToSend.time
			};

			try {
				send('service_kwpevqy', 'template_qhx76f9', mail, '2ucjbq62dBKzsL0bK');
			} catch (error) {
				alert('Tuvimos un problema enviandote el mail, pero tu turno ha sido confirmado!');
			}

			// router.push('/checkout/success');
		}
	};
</script>
