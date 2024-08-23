const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});

            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskById = this.req.params.id;
            const task = await TaskModel.findById(taskById);

            if (!task) {
                return this.res.status(404).send("Task not found");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                this.res.status(404).send("Task not found");
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            const allowToUpdate = ["isCompleted"];

            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowToUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    this.res
                        .status(500)
                        .send("Um ou mais campos não são editaveis");
                }
            }
            await taskToUpdate.save();

            return this.res.status(200).send("task to update");
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
