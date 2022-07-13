import { Comment, Task } from "../models/index.js";

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const newComment = new Comment({
            content,
            task: req.params.idTask,
            user: req.user._id,
        });

        await newComment.save();

        let findComment = await Comment.findOne({
            _id: newComment._id,
        }).populate({
            path: "user",
            select: { avatar: 1, username: 1 },
        });

        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.idTask },
            { $push: { comments: newComment._id } },
            { returnDocument: "after" }
        );

        return res.status(200).json({
            task: updateTask,
            comment: findComment,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
