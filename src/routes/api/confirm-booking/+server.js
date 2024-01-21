import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const { userId, serviceId, paymentMethod, price, time, date, month, year, description } =
		await request.json();

	const formatDateWithLeadingZeros = () => {
		const dateWithLeadingZeros = date < 10 ? `0${date}` : date;
		const monthWithLeadingZeros = month < 10 ? `0${month}` : month;
		return `${dateWithLeadingZeros}/${monthWithLeadingZeros}/${year}`;
	};

	const addTurnoToUser = async () => {
		const updatedUser = await prisma.user.update({
			where: { id: String(userId) },
			data: {
				totalTurnos: {
					increment: 1
				}
			}
		});

		if (!updatedUser)
			return json({ success: false, message: 'No se ha podido actualizar el usuario' });
	};

	const formattedDate = formatDateWithLeadingZeros();

	const newBooking = { time, userId, serviceId, paymentMethod, price, year, description };

	// check if there's already a booking for the same date and time
	const existingBooking = await prisma.booking.findFirst({
		where: {
			date: formattedDate,
			time
		}
	});

	if (existingBooking && existingBooking.status === 'Pendiente')
		return json({ success: false, message: 'Ya hay una reserva en ese horario' });

	if (existingBooking && existingBooking.status === 'Cancelado') {
		const updatedBooking = await prisma.booking.update({
			where: {
				id: existingBooking.id
			},
			data: {
				...newBooking,
				date: formattedDate,
				year: String(year),
				status: 'Pendiente'
			}
		});

		if (!updatedBooking) return json({ success: false });

		await addTurnoToUser();

		return json({ success: true, message: 'Reserva creada con éxito' });
	}

	const savedBooking = await prisma.booking.create({
		data: {
			...newBooking,
			price: Number(newBooking.price),
			paymentMethod: '',
			date: formattedDate,
			year: String(year)
		}
	});

	if (!savedBooking) return json({ success: false, message: 'No se ha podido crear la reserva' });

	await addTurnoToUser();

	return json({ success: true, message: 'Reserva creada con éxito', savedBooking });
}
