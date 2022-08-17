import { Activate, Project } from "../models/index.js";

export const getActivates = async (req, res) => {
    try {
        const projects = await Project.find({ members: req.user._id });
        const projectsArr = projects.map((e) => `${e._id}`);
        const data = await Activate.find({
            project: { $in: projectsArr },
        })
            .sort("-createdAt")
            .populate("project")
            .populate("userTarget");
        return res.json({
            msg: "Lấy dữ liệu thành công.",
            activates: data,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const createActivate = async (req, res) => {
    try {
        const { content, project } = req.body;
        const newActivate = new Activate({
            content,
            project,
            userTarget: req.user._id,
        });
        await newActivate.save();
        return res.json({
            msg: "Tạo hoạt động thành công.",
            activate: newActivate,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
