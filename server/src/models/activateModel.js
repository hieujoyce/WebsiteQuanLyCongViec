import mongoose from "mongoose";

const activateSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: "projects",
        },
        userTarget: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("activates", activateSchema);
