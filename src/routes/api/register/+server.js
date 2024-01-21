import { prisma } from '../../../database/client.js';
import { json } from '@sveltejs/kit';
import { hash } from 'bcrypt';

export async function POST({ request }) {
	const { clientId, name, email, phone, password } = await request.json();

	const newClient = { clientId, name, email, phone, password };

	const encryptedPassword = await hash(password, 10);

	const generatedId = String(new Date().getTime()).slice(-8);

	const savedClient = await prisma.user.create({
		data: {
			...newClient,
			id: generatedId,
			password: encryptedPassword
		}
	});

	if (!savedClient) return json({ success: false, message: 'No se ha podido crear el cliente' });

	return json({ id: generatedId, name, email, phone });
}
