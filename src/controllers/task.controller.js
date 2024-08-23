const TaskModel = require("../models/task.model");
const { notFoundError, objectIdError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdade } = require("../errors/general.errors");
const { default: mongoose } = require("mongoose");

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
                return notFoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
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
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowToUpdate = ["isCompleted"];

            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowToUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdade(this.res);
                }
            }
            await taskToUpdate.save();

            return this.res.status(200).send("task to update");
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
