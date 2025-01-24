import { PrismaClient } from '@prisma/client';
import { generateAvailableTimesAndDateFromDB } from '../../../utils/bookings.js';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	try {
		const { date } = await request.json();

		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return json({ message: 'Invalid date format. Expected YYYY-MM-DD' }, { status: 400 });
		}

		const vacationDays = await prisma.vacation.findMany();
		const vacations = vacationDays.map((vacation) => vacation.date.toISOString().split('T')[0]);

		const parsedDate = new Date(`${date}T00:00:00`);
		const workingHour = await prisma.workingHour.findUnique({
			where: { day: parsedDate.toLocaleString('en-US', { weekday: 'long' }) }
		});

		console.log(parsedDate.toLocaleString('en-US', { weekday: 'long' }));

		if (!workingHour) {
			return json({ message: 'No working hours available for the requested day' }, { status: 404 });
		}

		const { startTime, endTime } = workingHour;

		console.log(startTime, endTime);

		const availableTimes = await generateAvailableTimesAndDateFromDB(
			date,
			vacations,
			startTime,
			endTime
		);

		return json({
			status: 'success',
			data: availableTimes
		});
	} catch (error) {
		console.error('Error in booking route:', error);
		return json({ message: 'Internal server error' }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
