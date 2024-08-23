const express = require("express");
const dotenv = require("dotenv");

const { connectToDataBase } = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();

const app = express();
app.use(express.json());

connectToDataBase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});

        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*app.get("/tasks/:id", async (req, res) => {
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

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
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

app.listen(8000, () => console.log("listen on port 8000 🚀"));
