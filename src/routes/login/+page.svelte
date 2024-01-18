<script lang="js">
	import Login from '$lib/components/Forms/Login.svelte';
	import GoBack from '$lib/components/GoBack.svelte';

	if (typeof window !== 'undefined') {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user?.email) {
		}
	}
</script>

<svelte:head>
	<title>Inicia sesion | TGB</title>
</svelte:head>
<GoBack />

<section class="login-page">
	<img src="/favicon.png" alt="Gorosito Studio | Turnos" />
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
