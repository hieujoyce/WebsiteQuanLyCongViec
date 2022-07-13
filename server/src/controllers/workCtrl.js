import { Work, Task } from "../models/index.js";

export const createWork = async (req, res) => {
    try {
        const { title } = req.body;
        const newWork = new Work({ title, task: req.params.idTask });

        await newWork.save();

        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.idTask },
            { $push: { works: newWork._id }, $inc: { countWork: 1 } },
            { returnDocument: "after" }
        );

        return res.status(200).json({
            msg: "Tạo công việc thành công.",
            task: updateTask,
            work: newWork,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const updateWork = async (req, res) => {
    try {
        const updateWork = await Work.findOneAndUpdate(
            { _id: req.params.idWork },
            { ...req.body },
            {
                returnDocument: "after",
            }
        );

        return res.status(200).json({
            msg: "Cập nhật dự liệu thành công.",
            work: updateWork,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const deleteWork = async (req, res) => {
    try {
        await Work.findOneAndDelete({ _id: req.params.idWork });
        await Task.findOneAndUpdate(
            { _id: req.params.idTask },
            {
                $pull: {
                    works: req.params.idWork,
                },
                $inc: { countWork: -1 },
            }
        );

        return res.status(200).json({
            msg: "Xóa công việc thành công.",
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
