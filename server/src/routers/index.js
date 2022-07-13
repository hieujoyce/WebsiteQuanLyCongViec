import { Router } from "express";
import authRouter from "./authRouter.js";
import projectRouter from "./projectRouter.js";

const router = Router();

router.use("/api", authRouter);
router.use("/api", projectRouter);

export default router;
