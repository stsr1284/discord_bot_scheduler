// import { isValidDateFormat } from './utils';
const fs = require('fs');

function addScheduleEntry(date, content, author) {
	let scheduleData = [];
	try {
	  const data = fs.readFileSync('test.json', 'utf8');
	  scheduleData = JSON.parse(data);
	} catch(error) {
		return "file read error\n";
	}
	const existingEntryIndex = scheduleData.findIndex(entry => entry.date === date);
	if (existingEntryIndex !== -1) {
		scheduleData[existingEntryIndex].entries.push({ author, content });
	} else {
		scheduleData.push({ date, entries: [{ author, content }] });
	}
	fs.writeFileSync('test.json', JSON.stringify(scheduleData, null, 2));
	return "successfully\n";
}
  
function getContentByDate(date) {
	try {
	  if (!isValidDateFormat(date))
	  	return `date error ${date}.`;
	  const data = fs.readFileSync('test.json', 'utf8');
	  const scheduleData = JSON.parse(data);
	  const matchingEntry = scheduleData.find(entry => entry.date === date);
	  if (matchingEntry) {
		  let content = '';
		  matchingEntry.entries.forEach(entry => {
			  content += `${entry.author}: ${entry.content}\n`;
		  });
		  return content;
	  } else {
		  return `No content found for date ${date}.`;
	  }
	} catch (error) {
		return "Error reading file or parsing JSON\n";
	}
}
  
function scrapeDataAll() {
	try {
		const data = fs.readFileSync('test.json', 'utf8');
		const scheduleData = JSON.parse(data);
  
		let formattedData = '';
  
		scheduleData.forEach(entry => {
			formattedData += `Date: ${entry.date}\n`;
			entry.entries.forEach((item, index) => {
				formattedData += `Author: ${item.author}\nContent: ${item.content}\n`;
				if (index !== entry.entries.length - 1) {
					formattedData += '\n';
				}
			});
			if (entry !== scheduleData[scheduleData.length - 1]) {
				formattedData += '\n';
			}
		});
		return formattedData;
	} catch (error) {
		console.error('Error reading file or parsing JSON:', error);
		return "Error reading file or parsing JSON\n";
	}
}

function deleteContentByDateAndAuthor(date, author) {
	try {
		let scheduleData = [];
	if (fs.existsSync('test.json')) {
		const data = fs.readFileSync('test.json', 'utf8');
		scheduleData = JSON.parse(data);
		scheduleData.forEach(entry => {
			if (entry.date === date) {
				entry.entries = entry.entries.filter(item => item.author !== author);
			}
		});
		scheduleData = scheduleData.filter(entry => entry.entries.length > 0);
		fs.writeFileSync('test.json', JSON.stringify(scheduleData, null, 2));
		return `Entries with date ${date} and author ${author} deleted successfully.`;
	} else {
		return 'File does not exist.';
	}
	} catch (error) {
		return "Error reading file or parsing JSON\n";
	}
  }

module.exports = { addScheduleEntry, getContentByDate, scrapeDataAll, deleteContentByDateAndAuthor };
  