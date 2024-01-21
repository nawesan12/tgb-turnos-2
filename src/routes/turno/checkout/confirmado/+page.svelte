<section class="success page h-screen bg-black flex flex-col items-center justify-center gap-4">
	<h1 class="text-4xl font-bold">Felicidades!</h1>
	<p class="text-2xl">Tu turno fue reservado con éxito</p>
	<span class="underline">Te enviamos un mail con los detalles</span>

	<img src="/logo.png" alt="TGB Turnos" width={250} height={250} />
</section>

<style>
	@keyframes appear {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	h1,
	p,
	span {
		animation: appear 1s ease-in-out;
	}

	.aclaration {
		width: 75ch;
		text-align: center;
	}
</style>
