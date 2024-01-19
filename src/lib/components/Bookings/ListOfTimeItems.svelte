<script>
	import TimeItem from './TimeItem.svelte';

	export let times;
</script>

<section>
	<h2 class="p-4 text-2xl font-semibold">Horarios disponibles</h2>
	<ul>
		{#each times as time}
			<TimeItem {time} />
		{/each}
	</ul>
	<small class="block text-center">
		En caso de necesitar otro horario, contactar a Tomas directamente. &nbsp;
		<b>
			<a href="https://api.whatsapp.com/send?phone=2236855863&text=Hola%20Tomi!%20Como%20andas?">
				223 6855863 &nbsp;
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="#ff6f20"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
					<path
						d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"
					/>
				</svg>
			</a>
		</b>
	</small>
</section>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		width: min(100vw, 1200px);
		grid-gap: 3vh 4vh;
		place-items: center;
		margin-inline: auto;
		padding: 1rem;
	}

	small a {
		color: var(--orange);
		display: inline-flex;
	}
</style>
