const express = require("express");
const TaskModel = require("../models/task.model");
const TaskRouter = require("../controllers/task.controller");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

/*router.get("/:id", async (req, res) => {
    try {
        const taskById = req.params.id;
        const task = await TaskModel.findById(taskById);

        if (!task) {
            return res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
*/

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            res.status(404).send("Task not found");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowToUpdate = ["isCompleted"];

        const requestedUpdate = Object.keys(taskData);

        for (update of requestedUpdate) {
            if (allowToUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                res.status(500).send("Um ou mais campos não são editaveis");
            }
        }
        await taskToUpdate.save();

        return res.status(200).send("task to update");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
