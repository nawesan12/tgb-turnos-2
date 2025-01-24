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
		times: [],
	};

	// Convert initHour and finishHour to numeric values for the range (only hours, ignoring minutes)
	const startHour = parseInt(initHour.split(':')[0], 10);
	const endHour = parseInt(finishHour.split(':')[0], 10);

	// Fetch bookings for the given date
	const bookings = await prisma.appointment.findMany({
		where: {
			date: new Date(date),
		},
	});

	// Normalize booked times for consistent comparison
	const bookedTimes = new Set(
		bookings.map((booking) => booking.time.trim().padStart(5, '0')) // Ensure "HH:MM" format
	);

	// Generate all times within the range (assuming hour-based intervals)
	for (let i = startHour; i < endHour; i++) {
		const time = `${i.toString().padStart(2, '0')}:00`;

		// Exclude booked times from available times
		if (!bookedTimes.has(time)) {
			available.times.push(time);
		}
	}

	// Handle vacation days: Restrict times within the vacation constraints
	if (vacationDays.includes(date) && available.times.length) {
		const initPoint = available.times.indexOf(initHour);
		const finishPoint = available.times.indexOf(finishHour);

		// If boundaries are invalid, return no available times
		if (initPoint === -1 || finishPoint === -1) {
			return { ...available, times: [] };
		}

		return {
			...available,
			times: available.times.slice(initPoint, finishPoint + 1),
		};
	}

	return available;
};

