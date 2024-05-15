<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';
	import { bookingContext } from '../../../store/store';
	import { toast } from 'svelte-sonner';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let clientName;
	let clientEmail;
	let clientPhone;

	let checked;

	function updateUserDataLocally() {
		if (clientName && clientEmail && clientPhone) {
			bookingContext.update((value) => {
				return { ...value, clientName, clientEmail, clientPhone };
			});

			if (checked) {
				localStorage.setItem(
					'barber-client-data',
					JSON.stringify({ clientName, clientEmail, clientPhone })
				);
			}

			goto('/turno');
			return;
		}

		toast.warning('Debes llenar todos los campos!');
	}

	onMount(() => {
		const userAlreadyEntered = localStorage.getItem('barber-client-data');
		if (userAlreadyEntered) {
			const userData = JSON.parse(userAlreadyEntered);
			clientName = userData.clientName;
			clientEmail = userData.clientEmail;
			clientPhone = userData.clientPhone;
		}
		return;
	});
</script>

<section class="flex justify-center items-center flex-col p-4 h-screen gap-8">
	<div class="w-full">
		<Label>Nombre y apellido</Label>
		<Input bind:value={clientName} class="w-full" placeholder="Nombre y apellido" />
	</div>
	<div class="w-full">
		<Label>Email</Label>
		<Input bind:value={clientEmail} placeholder="Email" />
	</div>
	<div class="w-full">
		<Label>Telefono</Label>
		<Input bind:value={clientPhone} placeholder="Telefono" />
	</div>
	<div class="flex items-center space-x-2">
		<Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
		<Label
			id="terms-label"
			for="terms"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Recordar mis datos
		</Label>
	</div>

	<Button
		class="bg-white text-black border-2 border-orange-600"
		on:click={() => {
			updateUserDataLocally();
		}}>Siguiente</Button
	>
</section>
