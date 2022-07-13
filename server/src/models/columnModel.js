import mongoose from "mongoose";
const columnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Types.ObjectId,
        ref: "projects",
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "tasks",
        },
    ],
    taskOrder: [
        {
            type: mongoose.Types.ObjectId,
            ref: "tasks",
        },
    ],
});

export default mongoose.model("columns", columnSchema);
