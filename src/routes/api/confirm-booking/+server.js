import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const { time, date, month, description, name, email, phone } = await request.json();

	console.log({ time, date, month, description, name, email, phone });

	const formatDateWithLeadingZeros = () => {
		const dateWithLeadingZeros = date < 10 ? `0${date}` : date;
		const monthWithLeadingZeros = month < 10 ? `0${month}` : month;
		return `${new Date().getFullYear()}/${monthWithLeadingZeros}/${dateWithLeadingZeros}`;
	};

	const formattedDate = formatDateWithLeadingZeros();

	const newBooking = {
		time,
		date,
		description,
		name,
		email,
		phone
	};

	const savedBooking = await prisma.appointment.create({
		data: {
			...newBooking,
			date: new Date(formattedDate)
		}
	});

	if (!savedBooking) return json({ success: false, message: 'No se ha podido crear la reserva' });

	return json({ success: true, message: 'Reserva creada con éxito', savedBooking });
}
