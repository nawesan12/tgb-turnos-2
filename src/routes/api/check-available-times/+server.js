import { PrismaClient } from '@prisma/client';
import { generateAvailableTimesAndDateFromDB } from '../../../utils/bookings.js';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const { date } = await request.json();

	if (!date) return new Response(JSON.stringify({ message: 'Date is required!' }), { status: 400 });

	// Fetch vacation days from the database
	const vacationDays = await prisma.vacations.findMany();
	const vacations = vacationDays.map((vacation) => vacation.day);

	// Determine the time range based on the date
	const [day, month] = date.split('/'); // Assuming 'YYYY-MM-DD' format

	let startTime = '11:00';
	let endTime = '20:00';

	console.debug(day, month);

	if (month === '12') {
		if (day === '23' || day === '30') {
			// 23rd and 30th December: 08:00 to 19:00
			startTime = '08:00';
			endTime = '19:00';
		}

		if (day === '24' || day === '31') {
			// 24th and 31st December: 08:00 to 16:00
			startTime = '08:00';
			endTime = '16:00';
		}
	}

	// Generate available times using the utility function
	const availableTimes = await generateAvailableTimesAndDateFromDB(
		date,
		vacations,
		startTime,
		endTime
	);

	console.debug(availableTimes);

	return json(availableTimes);
}
