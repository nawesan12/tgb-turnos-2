export async function tryToRegister(userData, callback) {
	const res = await fetch(`https://turnos.gorositostudio.com/api/clients/register`, {
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

	localStorage.setItem('user', JSON.stringify(data));

	callback();
	return;
}

export async function tryToLogin(userData, callback) {
	const res = await fetch('https://turnos.gorositostudio.com/api/clients/login', {
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

	localStorage.setItem('user', JSON.stringify(data.user));
	callback();
	return;
}
