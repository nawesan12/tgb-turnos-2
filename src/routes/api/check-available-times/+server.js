import { PrismaClient } from '@prisma/client';
import { generateAvailableTimesAndDateFromDB } from '../../../utils/bookings.js';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const { date } = await request.json();

	if (!date) return new Response(JSON.stringify({ message: 'Date is required!' }), { status: 400 });

	const vacationDays = await prisma.vacations.findMany();
	const vacations = vacationDays.map((vacation) => vacation.day);
	const availableTimes = await generateAvailableTimesAndDateFromDB(
		date,
		vacations,
		'11:00',
		'20:00'
	);

	return json(availableTimes);
}
