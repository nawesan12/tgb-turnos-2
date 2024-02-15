<script>
	import GoBack from '$lib/components/GoBack.svelte';
	import TokenAssurance from '$lib/components/TokenAssurance/token-assurance.svelte';
	import { userContext } from '../../store/store';

	let user = {};
	let turnoMasProximo;
	let anteriorTurno;

	const unsubscribe = userContext.subscribe((value) => {
		user = value;
		updateTurnos();
	});

	function updateTurnos() {
		if (user) {
			const index = user?.bookings?.length - 1;
			turnoMasProximo = user?.bookings[index];
			anteriorTurno = isTurnoFuturo ? user?.bookings[index - 1] : user?.bookings[index];
		}
	}

	$: isTurnoFuturo =
		turnoMasProximo && new Date(turnoMasProximo.date + 'T' + turnoMasProximo.time) > new Date();
</script>

<TokenAssurance>
	<GoBack />

	<h1 class="m-4 text-3xl font-bold">Hola, {user.name}</h1>

	{#if isTurnoFuturo}
		<h2 class="mx-4 text-xl font-bold">Tu turno más cercano es este:</h2>
		<section class="p-4">
			<article class="flex bg-emerald-50 rounded-xl transition hover:shadow-xl">
				<div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
					<time
						datetime="2022-10-10"
						class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
					>
						<span>TGB</span>
						<span class="w-px flex-1 bg-gray-900/10"></span>
						<span>{user.name}</span>
					</time>
				</div>

				<div class="flex flex-1 flex-col justify-between">
					<div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
						<h3 class="font-bold uppercase text-gray-900">{turnoMasProximo.service}</h3>

						<p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
							Tu turno es el dia {turnoMasProximo.date} a las {turnoMasProximo.time}hs
						</p>
					</div>

					<div class="sm:flex sm:items-end sm:justify-end">
						<a
							href={`https://api.whatsapp.com/send?phone=2235929292&text=Hola%20amigo,$20soy%20${user.name},%20te%20aviso%20que%20voy%20a%20tener%20que%20cancelar%20el%20turno%20del${turnoMasProximo.date}%20a%20las${turnoMasProximo.time}`}
							class="inline-block px-5 py-3 text-right text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
						>
							Cancelar
						</a>
					</div>
				</div>
			</article>
		</section>
	{:else if user && user.bookings && user.bookings.length > 0}
		<p class="mx-4 text-xl font-bold">
			Aún no sacaste otro turno. <a
				class="text-orange-600 inline-flex items-center gap-2"
				href="/turno"
				>Agendate <svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#EA580C"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"
					/>
					<path d="M10 16h6" />
					<path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M4 8h3" />
					<path d="M4 12h3" />
					<path d="M4 16h3" />
				</svg></a
			>
		</p>
	{:else}
		<p class="mx-4 text-xl font-bold">Aún no has sacado ningún turno.</p>
	{/if}

	<!-- ... Código para mostrar el turno más próximo ... -->

	<section>
		<h3 class="m-4 text-xl font-semibold">Tu anterior turno</h3>

		<!-- ... Código para mostrar el turno anterior ... -->
		<ul class="p-4">
			<article class="rounded-xl border-2 border-gray-100 bg-white">
				<div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
					<div>
						<h3 class="font-medium text-black sm:text-lg">
							{anteriorTurno.service} el
							<p class="line-clamp-2 inline">
								{anteriorTurno.date} a las {anteriorTurno.time}
							</p>
						</h3>

						<div class="mt-2 sm:flex sm:items-center sm:gap-2">
							<div class="flex items-center gap-1 text-black">
								<p class="text-md font-semibold">Precio: ${anteriorTurno.price}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="flex justify-end">
					<strong
						class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>

						<span class="text-[10px] font-medium sm:text-xs">Asistido</span>
					</strong>
				</div>
			</article>
		</ul>
	</section>

	<h2 class="text-xl mx-4">Queres otro turno mas?</h2>
	<a class="text-orange-600 mx-4 text-xl inline-flex items-center gap-2" href="/turno"
		>Agendar <svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#EA580C"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
			<path d="M10 16h6" />
			<path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
			<path d="M4 8h3" />
			<path d="M4 12h3" />
			<path d="M4 16h3" />
		</svg></a
	>
</TokenAssurance>
