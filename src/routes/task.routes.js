const express = require("express");
const TaskModel = require("../models/task.model");
const TaskRouter = require("../controllers/task.controller");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).delete();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

module.exports = router;
