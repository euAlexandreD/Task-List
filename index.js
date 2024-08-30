const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const TaskRouter = require("./src/routes/task.routes");

const { connectToDataBase } = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDataBase();

app.use("/tasks", TaskRouter);

const port = process.env.PORT || 8001;

app.listen(port, () => console.log(`listen on port ${port} 🚀`));
