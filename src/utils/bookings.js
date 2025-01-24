import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const generateAvailableTimesAndDateFromDB = async (
	date,
	vacationDays,
	initHour,
	finishHour
) => {
	try {
		const available = {
			date: date,
			times: [],
		};

		// Parse initHour and finishHour
		const startHour = parseInt(initHour.split(':')[0], 10);
		const endHour = parseInt(finishHour.split(':')[0], 10);

		// Fetch all bookings for the specified date
		const bookings = await prisma.appointment.findMany({
			where: {
				date: new Date(date), // Ensure this matches the database format
			},
		});

		// Log fetched bookings for debugging
		console.log('Bookings:', bookings);

		// Extract and normalize booked times
		const bookedTimes = bookings.map((booking) =>
			booking.time.trim().padStart(5, '0') // Ensure format is consistent
		);

		// Log normalized booked times
		console.log('Normalized booked times:', bookedTimes);

		// Generate available times
		for (let i = startHour; i < endHour; i++) {
			const time = `${i.toString().padStart(2, '0')}:00`;

			// Log each generated time for debugging
			console.log('Checking time:', time);

			if (!bookedTimes.includes(time)) {
				available.times.push(time);
			}
		}

		// Handle vacation days
		if (vacationDays.includes(date) && available.times.length) {
			const initPoint = available.times.indexOf(initHour);
			const finishPoint = available.times.indexOf(finishHour);

			if (initPoint === -1 || finishPoint === -1) {
				console.log('Invalid vacation hour boundaries.');
				return { ...available, times: [] };
			}

			return {
				...available,
				times: available.times.slice(initPoint, finishPoint + 1),
			};
		}

		return available;
	} catch (error) {
		console.error('Error generating available times:', error);
		throw new Error('Failed to generate available times.');
	}
};
