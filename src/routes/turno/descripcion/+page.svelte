<script>
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { bookingContext } from '../../../store/store';

	let description;

	function updateDescriptionLocally() {
		console.log(description);
		bookingContext.update((booking) => {
			return { ...booking, description };
		});
	}
</script>

<TokenAssurance />
<GoBack />
<section class="description-page flex flex-col items-center gap-6">
	<h2 class="mb-6 pb-6 text-center text-3xl font-bold">
		Algo que quieras especificar sobre el corte?
	</h2>

	<textarea
		class="mt-4 shadow-drop-2-center text-black"
		name="description"
		id="description"
		placeholder="Decinos tu preferencia!"
		cols={30}
		rows={10}
		bind:value={description}
		on:change={updateDescriptionLocally}
	></textarea>

	<a href="/turno/checkout"> Siguiente </a>
</section>

<style>
	.description-page {
		margin-top: 2vh;
	}

	textarea {
		width: min(90vw, 800px);
		border: none;
		border-radius: 0.5rem;
		outline: none;
		padding: 1rem;
		font-size: 1.1rem;
		color: black;
		caret-color: var(--orange);
		resize: none;
		margin-top: 4vh;
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
