const helper = require('../helper');

async function insertOne(task) {
    task['id'] = await helper.getNextSequence("task", 1);
    const todoData = JSON.parse(await helper.readData());
    todoData.to_do_list.push(task);
    await helper.writeData(todoData);
}

async function findById(id) {
    const toDoList = JSON.parse(await helper.readData()).to_do_list;

    return toDoList.find(task => task.id === id);
}

async function findAll() {
    return JSON.parse(await helper.readData()).to_do_list || [];
}

async function findByIdAndUpdate(id, fields) {
    const todoData = JSON.parse(await helper.readData());
    let task = todoData.to_do_list.find(task => task.id === +id);

    if (!task) return false;

    for (const key in fields) {
        if (task.hasOwnProperty(key)) {
            task[key] = fields[key];
        }
    }
    await helper.writeData(todoData);

    return task;
}

async function findByIdAndDelete(id) {
    const todoData = JSON.parse(await helper.readData());
    const index = todoData.to_do_list.findIndex(task => task.id === +id);

    if (index === -1) return false;

    const removedTask = todoData.to_do_list.splice(index, 1);
    await helper.writeData(todoData);

    return removedTask;
}

module.exports = {
    insertOne: insertOne,
    findById: findById,
    findAll: findAll,
    findByIdAndUpdate: findByIdAndUpdate,
    findByIdAndDelete: findByIdAndDelete
};