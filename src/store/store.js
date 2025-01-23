import { writable } from 'svelte/store';

const initialBooking = {
	service: '',
	date: '',
	month: '',
	time: '',
	description: '',
	paymentMethod: 'Efectivo',
	availableTimes: [],
	price: '',
	serviceId: null
};

export const bookingContext = writable(initialBooking);

const initialUser = {
	bookings: []
};

export const userContext = writable(initialUser);
