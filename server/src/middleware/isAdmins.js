export default function isAdmins(req, res, next) {
    if (!req.isAdmins)
        return res
            .status(400)
            .json({ err: "Người dùng này không phải quản trị viên." });
    next();
}
