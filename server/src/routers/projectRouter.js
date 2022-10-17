import { Router } from "express";
import {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectCtrl.js";
import { createColumn, updateColumn } from "../controllers/columnCtrl.js";
import {
    createTask,
    deleteTask,
    getTaskByID,
    updateTask,
} from "../controllers/taskCtrl.js";

import { isAuth, isAdmins, isMembers } from "../middleware/index.js";
import { createWork, deleteWork, updateWork } from "../controllers/workCtrl.js";
import { createComment } from "../controllers/commentCtrl.js";
import { createActivate, getActivates } from "../controllers/activateCtrl.js";

const router = Router();

router.post("/project", isAuth, createProject);
router.get("/projects", isAuth, getAllProject);
router.get("/project/:idProject", isAuth, isMembers, getProjectById);
router.patch("/project/:idProject", isAuth, isMembers, isAdmins, updateProject);
router.delete(
    "/project/:idProject",
    isAuth,
    isMembers,
    isAdmins,
    deleteProject
);

router.post(
    "/project/:idProject/column",
    isAuth,
    isMembers,
    isAdmins,
    createColumn
);
router.patch(
    "/project/:idProject/column/:idColumn",
    isAuth,
    isMembers,
    isAdmins,
    updateColumn
);

router.post(
    "/project/:idProject/task",
    isAuth,
    isMembers,
    isAdmins,
    createTask
);
router.patch(
    "/project/:idProject/task/:idTask",
    isAuth,
    isMembers,
    isAdmins,
    updateTask
);

router.delete(
    "/project/:idProject/task/:idTask",
    isAuth,
    isMembers,
    deleteTask
);

router.get("/project/:idProject/task/:idTask", isAuth, isMembers, getTaskByID);
router.post(
    "/project/:idProject/task/:idTask/work",
    isAuth,
    isMembers,
    createWork
);

router.delete(
    "/project/:idProject/task/:idTask/work/:idWork",
    isAuth,
    isMembers,
    deleteWork
);

router.patch(
    "/project/:idProject/task/:idTask/work/:idWork",
    isAuth,
    isMembers,
    updateWork
);

router.post(
    "/project/:idProject/task/:idTask/comment",
    isAuth,
    isMembers,
    createComment
);
router.post("/activate", isAuth, createActivate);
router.get("/activate", isAuth, getActivates);

export default router;
