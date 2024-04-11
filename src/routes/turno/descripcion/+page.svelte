<script>
	import { goto } from '$app/navigation';
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { bookingContext } from '../../../store/store';

	let description;

	function updateDescriptionLocally() {
		console.log(description);
		bookingContext.update((booking) => {
			return { ...booking, description };
		});
	}
</script>

<GoBack />
<section class="description-page flex p-4 flex-col items-center gap-6">
	<h2 class="mb-6 pb-6 text-center text-3xl font-bold">
		Algo que quieras especificar sobre el corte?
	</h2>

	<Textarea
		class="mt-4 shadow-drop-2-center text-white"
		name="description"
		id="description"
		placeholder="Decinos tu preferencia!"
		cols={30}
		rows={10}
		bind:value={description}
		on:change={updateDescriptionLocally}
	></Textarea>

	<Button href="/turno/checkout" on:click={() => goto('/turno/checkout')}>Siguiente</Button>
</section>

<style>
	.description-page {
		margin-top: 2vh;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(90vw, 200px);
		background: var(--secondary);
		color: var(--primary);
		font-size: 1.1rem;
		font-weight: bold;
		padding: 0.5rem;
		border-radius: 0.5rem;
		margin: 5vh auto;
		border-right: 3px solid #ff6f20;
		border-left: 3px solid #ff6f20;
	}

	a:hover {
		box-shadow: 0 0 0.1rem 0.1rem var(--orange);
	}
</style>
