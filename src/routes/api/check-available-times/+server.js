import { PrismaClient } from '@prisma/client';
import { generateAvailableTimesAndDateFromDB } from '../../../utils/bookings.js';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	try {
		const { date } = await request.json();

		if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return json(
				{ message: 'Invalid or missing date. Expected format: YYYY-MM-DD' },
				{ status: 400 }
			);
		}

		//eslint-disable-next-line
		const [_, month, day] = date.split('-');

		let startTime = '11:00';
		let endTime = '19:00';

		// Custom time ranges for December dates
		if (month === '12') {
			if (day === '23' || day === '30') {
				startTime = '08:00';
				endTime = '19:00';
			} else if (day === '24' || day === '31') {
				startTime = '08:00';
				endTime = '16:00';
			}
		}

		const vacationDays = await prisma.vacation.findMany();
		const vacations = vacationDays.map((vacation) => vacation.date.toISOString().split('T')[0]);

		const availableTimes = await generateAvailableTimesAndDateFromDB(
			date,
			vacations,
			startTime,
			endTime
		);

		return json(availableTimes);
	} catch (error) {
		console.error('Error in booking route:', error);
		return json({ message: 'Internal server error' }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
