<script>
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Forms/Login.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	import { onMount } from 'svelte';
	import { userContext } from '../../store/store';

	onMount(() => {
		alert('Tenes que volver a registrarte!');

		if (typeof window !== 'undefined') {
			const user = JSON.parse(localStorage.getItem('user-goro'));
			if (user?.email) {
				userContext.set(user);
				//localStorage.setItem('user-goro', JSON.stringify(user));

				console.log('usuario en contexto:', $userContext);
				goto('/menu');
			}

			return;
		}
	});
</script>

<svelte:head>
	<title>Inicia sesion | TGB</title>
</svelte:head>
<GoBack />

<section class="login-page">
	<img src="/logo.png" alt="Gorosito Studio | Turnos" />
	<Login />
</section>

<style>
	.login-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5vh;
		height: 100vh;
	}
</style>
