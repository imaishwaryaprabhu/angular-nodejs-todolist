const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const FILE_PATH = "database/todolist.json";

async function initaliseDatabase() {
	let filehandle;
	try {
		filehandle = await fsp.open(path.resolve(FILE_PATH), 'wx+');
		if (filehandle) {
			const file = 'package.json';
			let packageData = await fsp.readFile(path.resolve(file));
			const package = JSON.parse(packageData);
			let todolist = {
				author: package.author,
				version: package.version,
				time_stamp: getFormattedDate(),
				to_do_list: [],
				counter: [{
					id: "task",
					seq: 1000
				}]
			};

			await fsp.writeFile(path.resolve(FILE_PATH), JSON.stringify(todolist));
		}
	} catch (error) {
		if (error.code === 'EEXIST') {
			console.log('File already exist!');
		} else {
			console.log(error);
		}
	} finally {
		if (filehandle !== undefined) {
			await filehandle.close();
		}
	}
}

async function readData() {
	return fsp.readFile(path.resolve(FILE_PATH));
}

async function writeData(todoData) {
	return fsp.writeFile(path.resolve(FILE_PATH), JSON.stringify(todoData));
}

async function getNextSequence(name, step) {
	let todoData = JSON.parse(await readData());
	const index = todoData.counter.findIndex(c => c.id === name);
	const seq = todoData.counter[index].seq += step;

	await writeData(todoData);
	return seq;
}

function getFormattedDate() {
	let date_ob = new Date();

	let date = date_ob.getDate();

	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	let month = monthNames[date_ob.getMonth()];

	let year = date_ob.getFullYear();

	let hours = date_ob.getHours();

	let minutes = date_ob.getMinutes();

	let ampm = hours >= 12 ? 'PM' : 'AM';

	return (date + " " + month + " " + year + " at " + hours + ":" + minutes + " " + ampm);
}

module.exports = {
	initaliseDatabase: initaliseDatabase,
	readData: readData,
	writeData: writeData,
	getNextSequence: getNextSequence,
	getFormattedDate: getFormattedDate
};
