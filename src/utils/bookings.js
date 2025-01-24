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

		// Parse initHour and finishHour to extract the hour component
		const startHour = parseInt(initHour.split(':')[0], 10);
		const endHour = parseInt(finishHour.split(':')[0], 10);

		// Fetch all bookings for the specified date
		const bookings = await prisma.appointment.findMany({
			where: {
				date: new Date(date),
			},
		});

		// Normalize booked times for consistent comparison
		const bookedTimes = new Set(
			bookings.map((booking) => booking.time.trim().padStart(5, '0')) // Format as "HH:MM"
		);

		// Generate available times within the range
		for (let i = startHour; i < endHour; i++) {
			const time = `${i.toString().padStart(2, '0')}:00`; // Generate time in "HH:MM" format

			// Only include times not in bookedTimes
			if (!bookedTimes.has(time)) {
				available.times.push(time);
			}
		}

		// If the date is a vacation day, adjust available times accordingly
		if (vacationDays.includes(date) && available.times.length) {
			const initPoint = available.times.indexOf(initHour);
			const finishPoint = available.times.indexOf(finishHour);

			// Handle invalid boundaries gracefully
			if (initPoint === -1 || finishPoint === -1) {
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
		throw new Error('Failed to generate available times. Please check the logs.');
	}
};
