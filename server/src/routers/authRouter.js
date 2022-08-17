import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import {
    register,
    login,
    refreshToken,
    searchUser,
} from "../controllers/authCtrl.js";
import { updateProfile } from "../controllers/userCtrl.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
router.post("/refreshToken", refreshToken);
router.get("/searchUser", isAuth, searchUser);
router.post("/profile/:id", isAuth, updateProfile);

export default router;
