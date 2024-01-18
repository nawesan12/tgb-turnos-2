<script>
	import GoBack from '$lib/components/GoBack.svelte';
</script>

<GoBack />

<h1 class="m-4 text-3xl font-bold">Hola, Nawe!</h1>
<h2 class="mx-4 text-xl font-bold">Tu turno mas proximo es este:</h2>

<section class="p-4">
	<article class="flex bg-emerald-50 rounded-xl transition hover:shadow-xl">
		<div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
			<time
				datetime="2022-10-10"
				class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
			>
				<span>TGB</span>
				<span class="w-px flex-1 bg-gray-900/10"></span>
				<span>Nawe</span>
			</time>
		</div>

		<div class="flex flex-1 flex-col justify-between">
			<div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
				<h3 class="font-bold uppercase text-gray-900">Corte + Perfilado</h3>

				<p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
					Tu turno es el dia 17/01/2024 a las 17:00hs
				</p>
			</div>

			<div class="sm:flex sm:items-end sm:justify-end">
				<a
					href="https://api.whatsapp.com/send?phone=2235929292&text=Hola%20amigo,%20te%20aviso%20que%20voy%20a%20tener%20que%20cancelar%20el%20turno%20de"
					class="inline-block px-5 py-3 text-right text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
				>
					Cancelar
				</a>
			</div>
		</div>
	</article>
</section>
