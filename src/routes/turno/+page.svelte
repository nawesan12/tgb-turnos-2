<script>
	import ListOfDates from '$lib/components/Bookings/ListOfDates.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
</script>

<GoBack />
<section class="turno-page">
	<h2 class="px-4 text-2xl font-semibold">Hola, Nawe!</h2>
	<h1 class="text-center text-2xl font-bold">Agenda tu turno</h1>

	<ListOfDates />

	<div class="choice">
		<!-- {turno.date ? (
            
              <h2 class="p-4 text-2xl font-semibold">Tu turno</h2>
              <section class="turno-info flex gap-4 px-4">
                <p class="selected-day px-2">
                  Dia:{" "}
                  {formatDate(
                    turno.month +
                      "/" +
                      turno.date +
                      "/" +
                      new Date().getFullYear()
                  )}
                </p>
              </section>
            
          ) : null} -->
	</div>

	<!-- {turno.date ? (
          <GoNextPage href="/turno/horario" callback={handleSaveTurno} />
        ) : null} -->
</section>

<style>
	.turno-page {
		margin-block: 2vh 0;
		display: flex;
		flex-direction: column;
	}

	.choice {
		font-size: 1rem;
		font-weight: 500;
	}

	.selected-day {
		letter-spacing: 2px;
	}

	.turno-info {
		opacity: 0.7;
	}
</style>
