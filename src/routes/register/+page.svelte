<script>
	import Register from '$lib/components/Forms/Register.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
</script>

<svelte:head>
	<title>Registrate | TGB</title>
</svelte:head>
<GoBack />

<section class="flex flex-col items-center justify-center gap-11 h-screen">
	<img src="/favicon.png" alt="Gorosito Studio | Turnos" />
	<Register />
</section>
