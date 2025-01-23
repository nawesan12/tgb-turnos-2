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

	// Convert initHour and finishHour to numeric values for the range (only hours, ignoring minutes)
	const startHour = parseInt(initHour.split(':')[0], 10);
	const endHour = parseInt(finishHour.split(':')[0], 10);

	// Fetch bookings for the given date
	const bookings = await prisma.appointment.findMany({
		where: {
			date: new Date(date)
		}
	});

	// Create a map of booked times for quick lookup (no filtering by status)
	const bookedTimes = new Set(bookings.map((booking) => booking.time));

	// Generate all times within the range (assuming hour-based intervals)
	for (let i = startHour; i <= endHour; i++) {
		const time = `${i.toString().padStart(2, '0')}:00`;

		// Check if the time is not booked
		if (!bookedTimes.has(time)) {
			available.times.push(time);
		}
	}

	// Check if the date is a vacation day and apply slicing to restrict available times
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
