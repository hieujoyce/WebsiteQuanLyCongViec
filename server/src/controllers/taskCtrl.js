import { Task, Column, Project } from "../models/index.js";

export const createTask = async (req, res) => {
    try {
        const { title, dec, tag, color, column, project } = req.body;

        const findColumn = await Column.findById(column);
        if (!findColumn)
            return res.status(400).json({ err: "Id cột không chính xác" });
        const newTask = new Task({
            title,
            dec,
            tag,
            color,
            column,
            project,
        });
        await newTask.save();
        findColumn.tasks.push(newTask._id);
        findColumn.taskOrder.push(newTask._id);
        await findColumn.save();
        return res.json({
            msg: "Tạo task thành công",
            task: newTask,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const getTaskByID = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.idTask })
            .populate("works")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: { avatar: 1, username: 1 },
                },
            });

        return res.status(200).json({ msg: "Lấy Dữ liệu thành công.", task });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.idTask },
            { ...req.body },
            {
                returnDocument: "after",
            }
        ).populate("works comments");

        return res
            .status(200)
            .json({ msg: "Cập nhật Dữ liệu thành công.", task: updateTask });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
