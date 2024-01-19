<script>
	import ServiceItem from './ServiceItem.svelte';

	export let services;

	const normalServices = services.filter((service) => service.type !== 'Combo');
	const comboServices = services.filter((service) => service.type === 'Combo');
</script>

<ul>
	{#each normalServices as service}
		<ServiceItem id={service.id} name={service.name} price={service.price} image={service.image} />
	{/each}
</ul>
<h2 class="text-3xl font-bold my-8">O algun combo?</h2>
<ul>
	{#each comboServices as service}
		<ServiceItem id={service.id} name={service.name} price={service.price} image={service.image} />
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		width: min(100vw, 800px);
		grid-gap: 4vh;
		margin-inline: auto;
		padding: 1rem;
	}
</style>
