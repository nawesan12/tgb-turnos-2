import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const services = await prisma.service.findMany();

	return {
		services: services.sort((a, b) => a.id - b.id)
	};
}
