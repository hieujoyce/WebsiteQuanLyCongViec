import mongoose from "mongoose";
const workSchema = new mongoose.Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: "tasks",
    },
    title: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("works", workSchema);
