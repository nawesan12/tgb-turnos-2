<script>
	import { goto } from '$app/navigation';
	import { userContext } from '../../../store/store';
	let email;
	let password;

	async function handleForm() {
		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		if (data.success === false) {
			alert('Usuario o contraseña incorrectos');
			return;
		}

		userContext.update(() => data.user);
		localStorage.setItem('user', JSON.stringify(data.user));
		goto('/menu');
		return;
	}
</script>

<section class="login-form">
	<form>
		<div class="name flex flex-col gap-2">
			<label for="name" class="text-xl"> Email: </label>
			<input
				class="text-md rounded-md p-2"
				type="email"
				bind:value={email}
				placeholder="Email"
				required
			/>
		</div>

		<div class="email flex flex-col gap-2">
			<label for="email" class="text-xl"> Contraseña: </label>
			<input
				class="text-md rounded-md p-2"
				type="password"
				bind:value={password}
				placeholder="Contraseña"
				required
			/>
		</div>

		<span class="block text-center font-medium">
			Aun no tenes una cuenta?{' '}
			<a href="/register" class="text-amber-500">Registrate</a>{' '}
		</span>

		<button on:click={handleForm}>Iniciar sesion</button>
	</form>
</section>

<style>
	.login-form {
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

	input {
		color: black;
	}

	.name,
	.email {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	form input[type='email'],
	form input[type='password'] {
		border: none;
		outline: none;
		border-bottom: 3px solid black;
	}

	form input[type='email']:focus,
	form input[type='password']:focus {
		border-bottom: 3px solid var(--orange);
	}

	button {
		width: 100%;
		padding: 1rem;
		background: var(--primary);
		color: var(--secondary);
		border: none;
		outline: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-size: 1.1rem;
		font-weight: bold;
	}
</style>
