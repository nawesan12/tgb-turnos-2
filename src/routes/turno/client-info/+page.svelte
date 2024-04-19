<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { bookingContext } from '../../../store/store';
	import { toast } from 'svelte-sonner';

	let clientName;
	let clientEmail;
	let clientPhone;

	function updateUserDataLocally() {
		if (clientName && clientEmail && clientPhone) {
			bookingContext.update((value) => {
				return { ...value, clientName, clientEmail, clientPhone };
			});

			goto('/turno');
			return;
		}

		toast.warning('Debes llenar todos los campos!');
	}
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

	<Button
		class="bg-white text-black border-2 border-orange-600"
		on:click={() => {
			updateUserDataLocally();
		}}>Siguiente</Button
	>
</section>
