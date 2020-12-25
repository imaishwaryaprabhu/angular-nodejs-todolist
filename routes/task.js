const TaskController = require("../controllers/task");

const express = require("express");
const router = express.Router();

router.post("/", TaskController.createTask);

router.get("/", TaskController.getTasks);

router.put("/:id", TaskController.updateTask);

router.delete("/:id", TaskController.deleteTask);

module.exports = router;
