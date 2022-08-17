import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export default function isAuth(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ err: "Lỗi xác thực." });
    }
    jwt.verify(token, process.env.AC_TOKEN, async (err, decoded) => {
        if (err) return res.status(400).json({ err: "Lỗi xác thưc." });
        const { id } = decoded;
        const findUsername = await User.findById(id).select("-password");
        if (!findUsername)
            return res.status(400).json({ err: "Lỗi xác thực." });
        req.user = findUsername;
        // console.log(req.user);
        // console.log(req.user.projects);
        next();
    });
}
