<section class="login-form">
	<form method="POST" action="">
		<div class="name flex flex-col gap-2">
			<label for="name" class="text-xl"> Email: </label>
			<input class="text-md rounded-md p-2" type="email" placeholder="Email" required />
		</div>

		<div class="email flex flex-col gap-2">
			<label for="email" class="text-xl"> Contraseña: </label>
			<input class="text-md rounded-md p-2" type="password" placeholder="Contraseña" required />
		</div>

		<span class="block text-center font-medium">
			Aun no tenes una cuenta?{' '}
			<a href="/register" class="text-amber-500">Registrate</a>{' '}
		</span>

		<input type="submit" value="Ingresar" />
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

	form input[type='submit'] {
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
