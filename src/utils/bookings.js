import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const generateAvailableTimesAndDateFromDB = async (
	date,
	vacationDays,
	initHour,
	finishHour
) => {
	const available = {
		date: date,
		times: []
	};

	// Convert initHour and finishHour to numeric values for the range
	const startHour = parseInt(initHour.split(':')[0], 10);
	const endHour = parseInt(finishHour.split(':')[0], 10);

	// Fetch bookings for the given date
	const bookings = await prisma.booking.findMany({
		where: {
			date: date
		}
	});

	// Generate all times within the range
	for (let i = startHour; i <= endHour; i++) {
		const time = `${i.toString().padStart(2, '0')}:00`;

		// Check if the time is booked and not canceled
		const isBooked = bookings.find(
			(booking) => booking.time === time && booking.status !== 'Cancelado'
		);

		// Add to available times if not booked
		if (!isBooked) {
			available.times.push(time);
		}
	}

	// Check if the date is a vacation day and apply slicing
	if (vacationDays.includes(available.date) && available.times.length) {
		const initPoint = available.times.indexOf(initHour);
		const finishPoint = available.times.indexOf(finishHour);

		// If either boundary is invalid, return an empty list of times
		if (initPoint === -1 || finishPoint === -1) {
			return { ...available, times: [] };
		}

		// Slice the times to fit within the vacation constraints
		return {
			...available,
			times: available.times.slice(initPoint, finishPoint + 1)
		};
	}

	return available;
};
