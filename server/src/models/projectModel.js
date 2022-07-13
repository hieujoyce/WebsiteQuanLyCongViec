import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dec: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    userOwner: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
    ],
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
    ],
    columns: [
        {
            type: mongoose.Types.ObjectId,
            ref: "columns",
        },
    ],
    columnOrder: [
        {
            type: mongoose.Types.ObjectId,
            ref: "columns",
        },
    ],
});

export default mongoose.model("projects", projectSchema);
