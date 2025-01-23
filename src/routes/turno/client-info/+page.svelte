<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';
	import { bookingContext } from '../../../store/store';
	import { toast } from 'svelte-sonner';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let name;
	let email;
	let phone;

	let checked;

	function updateUserDataLocally() {
		if (name && email && phone) {
			bookingContext.update((value) => {
				return { ...value, name, email, phone };
			});

			if (checked) {
				localStorage.setItem('barber-client-data', JSON.stringify({ name, email, phone }));
			}

			console.log(name, email, phone);

			goto('/turno');
			return;
		}

		toast.warning('Debes llenar todos los campos!');
	}

	onMount(() => {
		const userAlreadyEntered = localStorage.getItem('barber-client-data');
		if (userAlreadyEntered) {
			const userData = JSON.parse(userAlreadyEntered);
			name = userData.name;
			email = userData.email;
			phone = userData.phone;
		}
		return;
	});
</script>

<section class="flex justify-center items-center flex-col p-4 h-screen gap-8">
	<div class="w-full lg:max-w-lg">
		<Label>Nombre y apellido</Label>
		<Input bind:value={name} class="w-full" placeholder="Nombre y apellido" />
	</div>
	<div class="w-full lg:max-w-lg">
		<Label>Email</Label>
		<Input bind:value={email} placeholder="Email" />
	</div>
	<div class="w-full lg:max-w-lg">
		<Label>Telefono</Label>
		<Input bind:value={phone} placeholder="Telefono" />
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
