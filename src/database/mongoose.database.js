const mogoose = require("mongoose");

const connectToDataBase = async () => {
    await mogoose.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@task-list.hxtz4.mongodb.net/?retryWrites=true&w=majority&appName=TASK-LIST`,
        () => console.log("conected to MongoDB")
    );
};

module.exports = {
    connectToDataBase,
};
