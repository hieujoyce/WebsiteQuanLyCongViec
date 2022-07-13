import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Types.ObjectId,
            ref: "tasks",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("comments", commentSchema);
