export async function tryToRegister(userData, callback) {
	const res = await fetch(`/api/clients/register`, {
		method: 'POST',
		body: JSON.stringify({
			name: userData.name,
			email: userData.email,
			phone: userData.phone,
			password: userData.password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await res.json();

	if (data.success === false) {
		alert('Usuario o contraseña incorrectos');
		return;
	}

	localStorage.setItem('user-goro', JSON.stringify(data));

	callback();
	return;
}

export async function tryToLogin(userData, callback) {
	const res = await fetch('/api/clients/login', {
		method: 'POST',
		body: JSON.stringify({
			email: userData.email,
			password: userData.password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await res.json();

	if (data.success === false) {
		alert('Usuario o contraseña incorrectos');
		return;
	}

	localStorage.setItem('user-goro', JSON.stringify(data.user));
	callback();
	return;
}

export const id = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
