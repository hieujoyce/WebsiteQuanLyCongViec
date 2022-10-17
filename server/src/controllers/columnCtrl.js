import { Column, Project } from "../models/index.js";

export const createColumn = async (req, res) => {
    try {
        const { title, project } = req.body;
        const findProject = await Project.findById(project);
        if (!findProject)
            return res.status(400).json({ err: "Id project không chính xác" });

        const newColumn = new Column({
            title,
            project,
        });

        await newColumn.save();

        findProject.columns.push(newColumn._id);
        findProject.columnOrder.push(newColumn._id);
        await findProject.save();

        return res.json({
            msg: "Cập nhật dự liệu thành công",
            column: newColumn,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
export const updateColumn = async (req, res) => {
    try {
        const { title, tasks, taskOrder } = req.body;
        const updateColumn = await Column.findOneAndUpdate(
            { _id: req.params.idColumn },
            { title, tasks, taskOrder },
            { returnDocument: "after" }
        ).populate({
            path: "tasks",
            populate: {
                path: "members",
                select: { avatar: 1, username: 1 },
            },
        });

        return res.json({
            msg: "Cập nhật dự liệu thành công",
            column: updateColumn,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
