import { Project } from "../models/index.js";

async function isMembers(req, res, next) {
    try {
        const findProject = await Project.findOne({
            _id: req.params.idProject,
        }).select("members userOwner admins");

        if (!findProject)
            return res.status(400).json({ err: "Id dự án không chính xác" });

        if (!findProject.members.includes(req.user._id))
            return res
                .status(400)
                .json({ err: "Người dùng này không phải thành viên" });

        if (findProject.admins.includes(req.user._id)) {
            req.isAdmins = true;
        } else {
            req.isAdmins = false;
        }

        next();
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

export default isMembers;
