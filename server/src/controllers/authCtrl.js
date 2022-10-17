import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretRfToken = process.env.RF_TOKEN;
const secretAcToken = process.env.AC_TOKEN;

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const findUser = await User.findOne({ username });
        if (findUser)
            return res
                .status(400)
                .json({ err: "Tên tài khoản đã có người sử dụng." });
        const findUser1 = await User.findOne({ email });
        if (findUser1)
            return res.status(400).json({ err: "Email đã có người sử dụng." });

        const err = validateRegister(username, password);
        if (err.length > 0) return res.status(400).json({ err: err });
        const hashPw = await bcrypt.hash(password, 12);
        const user = new User({ email, username, password: hashPw });
        // const rfToken = jwt.sign({ id: user._id }, secretRfToken, {
        //     expiresIn: "30d",
        // });

        const acToken = jwt.sign({ id: user._id }, secretAcToken, {
            expiresIn: "3d",
        });

        // res.cookie("rf_token", rfToken, {
        //     httpOnly: true,
        //     path: "/api/refreshToken",
        //     maxAge: 30 * 24 * 60 * 60,
        // });

        await user.save();

        return res.json({
            msg: "Đăng kí tài khoản thành công",
            user: user,
            accessToken: acToken,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res
                .status(400)
                .json({ err: "Email hoặc mật khẩu không chính xác." });

        const result = bcrypt.compareSync(password, findUser.password);
        if (!result)
            return res
                .status(400)
                .json({ err: "Tên tài khoản hoặc mật khẩu không chính xác." });
        // const rfToken = jwt.sign({ id: findUser._id }, secretRfToken, {
        //     expiresIn: "30d",
        // });

        const acToken = jwt.sign({ id: findUser._id }, secretAcToken, {
            expiresIn: "3d",
        });

        delete findUser._doc.password;

        // res.cookie("rf_token", rfToken, {
        //     httpOnly: true,
        //     path: "/api/refreshToken",
        //     maxAge: 30 * 24 * 60 * 60,
        // });

        return res.json({
            msg: "Đăng nhập tài khoản thành công",
            user: findUser,
            accessToken: acToken,
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

// export const logout = async (req, res) => {
//     try {
//         // res.clearCookie("rf_token", {
//         //     path: "/api/refreshToken",
//         // });
//         return res.json({ msg: "Đăng xuất thành công" });
//     } catch (error) {
//         res.status(500).json({ err: error.message });
//     }
// };

export const refreshToken = async (req, res) => {
    try {
        // const refreshToken = req.cookies.rf_token;
        // console.log(refreshToken);
        const { accessToken } = req.body;
        jwt.verify(accessToken, secretAcToken, async (err, decoded) => {
            if (err) return res.status(400).json({ err: "Xin hãy đăng nhập." });
            const { id } = decoded;
            const findUsername = await User.findById(id);
            if (!findUsername)
                return res.status(400).json({ err: "Xin hãy đăng nhập." });

            // const acToken = jwt.sign({ id: findUsername._id }, secretAcToken, {
            //     expiresIn: "1d",
            // });
            return res.json({ accessToken: accessToken, user: findUsername });
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { search } = req.query;
        const findUsers = await User.find({
            username: { $regex: `^${search}.*` },
        }).select({ username: 1, avatar: 1 });
        return res.json({ searchUsers: findUsers });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

function validateRegister(username, password) {
    const err = [];
    if (username.length > 25) {
        err.push("Tên tài khoản không được dài quá 25 kí tự");
    } else if (username.length < 6) {
        err.push("Tên tài khoản không được ngắn hơn 6 kí tự");
    }

    if (password.length > 25) {
        err.push("Mật khẩu không được dài quá 25 kí tự");
    } else if (password.length < 6) {
        err.push("Mật khẩu khoản không được ngắn hơn 6 kí tự");
    }
    return err;
}
