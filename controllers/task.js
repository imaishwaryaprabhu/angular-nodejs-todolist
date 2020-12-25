const Task = require("../models/task");

exports.createTask = async (req, res, next) => {
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            reminderTime: new Date(...req.body.reminderTime.split('/')),
            createdTime: new Date()
        };
        await Task.insertOne(task);

        res.status(200).send({
            message: "Task added successfully.",
            task: task
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to create a task." });
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll();

        res.status(201).send({
            message: "Success",
            tasks: tasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to fetch tasks." });
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { description: req.body.description, reminderTime: req.body.reminderTime });
        if (!task) return res.status(404).send({ message: "Task with the given ID not found." });

        res.status(204).send({
            message: "Task updated successfully.",
            task: task
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to update task." });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send({ message: "Task with the given ID not found." });

        res.status(204).send({
            message: "Task deleted successfully.",
            task: task
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to delete the task." });
    }
};
