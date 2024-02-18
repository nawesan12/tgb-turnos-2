<script>
	import { goto } from '$app/navigation';
	import { userContext } from '../../../store/store';
	import { id } from '../../../utils/auth';

	let name = '';
	let email = '';
	let phone = '';
	let password = '';

	async function handleForm() {
		const tryToRegister = await fetch(`/api/register`, {
			method: 'POST',
			body: JSON.stringify({
				clientId: id(), //AUTOGENERARID
				name,
				email,
				phone,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await tryToRegister.json();

		if (data.success === false) {
			alert('Usuario o contraseña incorrectos');
			return;
		}

		userContext.update((e) => data);
		localStorage.setItem('user-goro', JSON.stringify(data));

		goto('/login');
		return;
	}
</script>

<section class="register-form text-black">
	<form>
		<div class="name flex flex-col gap-2">
			<label for="name" class="text-xl text-white"> Nombre: </label>
			<input
				class="text-md rounded-md p-2"
				type="text"
				bind:value={name}
				placeholder="Nombre"
				required
			/>
		</div>

		<div class="email flex flex-col gap-2">
			<label for="email" class="text-xl text-white"> Email: </label>
			<input
				class="text-md rounded-md p-2"
				type="email"
				bind:value={email}
				placeholder="Email"
				required
			/>
		</div>

		<div class="email flex flex-col gap-2">
			<label for="number" class="text-xl text-white"> Telefono: </label>
			<input
				class="text-md rounded-md p-2"
				type="text"
				bind:value={phone}
				inputMode="numeric"
				placeholder="Telefono"
				required
			/>
		</div>

		<div class="email flex flex-col gap-2">
			<label for="number" class="text-xl text-white"> Contraseña: </label>
			<input
				class="text-md rounded-md p-2"
				type="password"
				bind:value={password}
				inputMode="text"
				placeholder="Contraseña"
				required
			/>
			<span class="block text-center font-medium">
				Ya tenes cuenta?{' '}
				<a href="/login" class="text-amber-500">Inicia sesion</a>{' '}
			</span>
		</div>

		<button class="bg-white px-8 py-4 text-black rounded-lg" on:click={handleForm}
			>Registrarme</button
		>
	</form>
</section>

<style>
	.register-form {
		width: min(90vw, 600px);
		height: auto;
		margin-inline: auto;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		background: var(--secondary);
		gap: 2rem;
	}

	.name,
	.email {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	form input[type='text'],
	form input[type='email'] {
		border: none;
		outline: none;
		border-bottom: 3px solid black;
	}

	form input[type='text']:focus,
	form input[type='email']:focus {
		border-bottom: 3px solid var(--orange);
	}
</style>
