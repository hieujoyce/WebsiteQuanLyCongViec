import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import {
    register,
    login,
    refreshToken,
    searchUser,
} from "../controllers/authCtrl.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
router.post("/refreshToken", refreshToken);
router.get("/searchUser", isAuth, searchUser);

export default router;
