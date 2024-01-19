import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

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

	if (!user)
		return new Response(
			JSON.stringify({ success: false, message: 'No se ha podido obtener el usuario' }),
			{ status: 400 }
		);

	if (!user.password)
		return new Response(
			JSON.stringify({ success: false, message: 'No se ha podido obtener la contraseña' }),
			{ status: 400 }
		);

	const isPasswordCorrect = await compare(password, user.password);

	if (!isPasswordCorrect)
		return new Response(
			JSON.stringify({ success: false, message: 'La contraseña es incorrecta' }),
			{ status: 400 }
		);

	return json({ user });
}
