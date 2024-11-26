import { PrismaClient } from '@prisma/client';

export const generateActualMonthDates = () => {
	const actualDate = new Date();
	const actualMonth = actualDate.getMonth();
	const actualYear = actualDate.getFullYear();
	const actualMonthDates = new Date(actualYear, actualMonth + 1, 0).getDate();

	const dates = [];

	// Generate all dates in the current month
	for (let i = 1; i <= actualMonthDates; i++) {
		dates.push({ year: actualYear, month: actualMonth + 1, day: i });
	}

	let filteredDates;

	// Special handling for December (Month 11 in JavaScript Date object)
	if (actualMonth === 11) {
		const specialDates = [23, 30];
		filteredDates = dates.filter((date) => {
			const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
			return (dayOfWeek !== 0 && dayOfWeek !== 1) || specialDates.includes(date.day);
		});
	} else {
		// For other months, filter out Sundays (0) and Mondays (1)
		filteredDates = dates.filter((date) => {
			const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
			return dayOfWeek !== 0 && dayOfWeek !== 1;
		});
	}
	return filteredDates;
};

export const generateNextMonthDates = () => {
	const actualDate = new Date();
	const actualMonth = actualDate.getMonth();
	const actualYear = actualDate.getFullYear();

	// Determine the next month and year
	const isDecember = actualMonth === 11;
	const nextMonth = isDecember ? 0 : actualMonth + 1; // January is 0
	const nextYear = isDecember ? actualYear + 1 : actualYear;

	// Get the number of days in the next month
	const nextMonthDates = new Date(nextYear, nextMonth + 1, 0).getDate();

	const dates = [];

	// Generate all dates in the next month
	for (let i = 1; i <= nextMonthDates; i++) {
		dates.push({ year: nextYear, month: nextMonth + 1, day: i });
	}

	// Define special dates that should always be included (for December)
	const specialDates = [23, 30];

	// Filter out Sundays (0) and Mondays (1), except for special dates in December
	const filteredDates = dates.filter((date) => {
		const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
		// Allow special dates only if nextMonth is December (month 11 in Date object)
		if (nextMonth === 11 && specialDates.includes(date.day)) {
			return true;
		}
		// Exclude Sundays (0) and Mondays (1)
		return dayOfWeek !== 0 && dayOfWeek !== 1;
	});

	return filteredDates;
};

export const generateFiestasTurnos = async (date) => {
	const prisma = new PrismaClient();

	const [day, month] = date.split('/');

	let availableTimes;
	if (month === '12') {
		if (day === '23' || day === '30') {
			availableTimes = [
				'08:00',
				'09:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00',
				'17:00',
				'18:00',
				'19:00'
			];
		} else if (day === '24' || day === '31') {
			availableTimes = [
				'08:00',
				'09:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00'
			];
		} else {
			availableTimes = [
				'08:00',
				'09:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00'
			];
		}
	} else {
		availableTimes = [
			'08:00',
			'09:00',
			'10:00',
			'11:00',
			'12:00',
			'13:00',
			'14:00',
			'15:00',
			'16:00'
		];
	}

	const available = {
		date: date,
		times: availableTimes
	};

	const bookings = await prisma.booking.findMany({
		where: {
			date: available.date
		}
	});

	const bookedTimes = bookings.map((booking) => booking.time);

	available.times = available.times.filter((time) => !bookedTimes.includes(time));

	return available;
};
