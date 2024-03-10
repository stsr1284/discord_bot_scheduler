function isValidDateFormat(dateString) {
	// Regular expression to match the format "yyyy-mm-dd"
	const regex = /^\d{4}-\d{2}-\d{2}$/;

	// Test if the dateString matches the regex pattern
	return regex.test(dateString);
}

module.exports = { isValidDateFormat };