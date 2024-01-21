import { prisma } from '../../../database/client.js';
import { compare } from 'bcrypt';
import { json } from '@sveltejs/kit';
import { services } from '../../../utils/services';

export async function POST({ request }) {
	const { email, password } = await request.json();

	const user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			id: true,
			email: true,
			password: true,
			name: true,
			phone: true,
			totalCoins: true,
			totalTurnos: true
		}
	});

	const userBookings = await prisma.booking.findMany({
		where: {
			userId: user.id
		}
	});

	const userBookingsWithServiceNames = userBookings.map((booking) => {
		return {
			...booking,
			service: services[booking.serviceId - 1]
		};
	});

	if (!user) return;
	json({ success: false, message: 'No se ha podido obtener el usuario' });

	if (!user.password)
		return json({ success: false, message: 'No se ha podido obtener la contraseña' });

	const isPasswordCorrect = await compare(password, user.password);

	if (!isPasswordCorrect) return json({ success: false, message: 'La contraseña es incorrecta' });

	const userWithBookings = {
		...user,
		bookings: [...userBookingsWithServiceNames]
	};

	console.log(userWithBookings);

	return json({ user: userWithBookings });
}
