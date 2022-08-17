import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, patchApi, deleteApi } from "../../utils/api";

const createProject = createAsyncThunk(
    "users/createProject",
    async ({ data, token, setProjects }, thunkApi) => {
        try {
            const res = await postApi("/project", data, token);
            setProjects((projects) => [...projects, res.data.project]);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const updateProject = createAsyncThunk(
    "users/updateProject",
    async ({ data, token, setProjects, id }, thunkApi) => {
        try {
            const res = await patchApi(`/project/${id}`, data, token);
            setProjects((projects) => {
                return projects.map((el) =>
                    el._id === res.data.project._id ? res.data.project : el
                );
            });
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const updateProjectv2 = createAsyncThunk(
    "users/updateProjectv2",
    async ({ data, token, idProject, content }, thunkApi) => {
        try {
            const res = await patchApi(`/project/${idProject}`, data, token);
            await postApi("/activate", { content, project: idProject }, token);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const updateProjectColumnOrder = createAsyncThunk(
    "users/updateProjectColumnOrder",
    async ({ data, token, id, content }, thunkApi) => {
        try {
            const res = await patchApi(`/project/${id}`, data, token);
            await postApi("/activate", { content, project: id }, token);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const deleteProject = createAsyncThunk(
    "users/updateProject",
    async ({ token, setProjects, id }, thunkApi) => {
        try {
            const res = await deleteApi(`/project/${id}`, token);
            setProjects((projects) => {
                return projects.filter((el) => el._id !== id);
            });
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export {
    createProject,
    updateProject,
    deleteProject,
    updateProjectColumnOrder,
    updateProjectv2,
};
