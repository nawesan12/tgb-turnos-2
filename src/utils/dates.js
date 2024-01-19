export const generateActualMonthDates = () => {
	const actualDate = new Date();
	const actualMonth = actualDate.getMonth();
	const actualYear = actualDate.getFullYear();
	const actualMonthDates = new Date(actualYear, actualMonth + 1, 0).getDate();

	const dates = [];

	for (let i = 1; i <= actualMonthDates; i++) {
		dates.push({ year: actualYear, month: actualMonth + 1, day: i });
	}

	const filteredMondaysAndSundays = dates.filter((date) => {
		const day = new Date(date.year, date.month - 1, date.day).getDay();
		return day !== 0 && day !== 1;
	});

	return filteredMondaysAndSundays;
};
