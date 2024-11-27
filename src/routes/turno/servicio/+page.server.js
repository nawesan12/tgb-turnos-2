import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const services = await prisma.service.findMany();
	const holidayServices = await prisma.holidayService.findMany();

	return {
		services: services.sort((a, b) => a.id - b.id),
		holidayServices: holidayServices.sort((a, b) => a.id - b.id)
	};
}
