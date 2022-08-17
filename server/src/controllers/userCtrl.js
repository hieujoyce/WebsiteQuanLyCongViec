import { User } from "../models/index.js";

export const updateProfile = async (req, res) => {
    try {
        if (req.params.id !== `${req.user._id}`)
            return res.status(400).json({
                err: "User không có quyền thay đổi profile của người khác",
            });

        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                avatar: req.body.avatar,
            },
            {
                returnDocument: "after",
            }
        );
        return res.json({
            msg: "Cập nhật profile thành công",
            user: updateUser,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
