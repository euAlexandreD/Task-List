const express = require("express");
const TaskRouter = require("../controllers/task.controller");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:_id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

router.delete("/:_id", async (req, res) => {
    return new TaskController(req, res).delete();
});

router.patch("/:_id", async (req, res) => {
    return new TaskController(req, res).update();
});

module.exports = router;
