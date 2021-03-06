import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi, patchApi } from "../../utils/api";

const createTask = createAsyncThunk(
    "users/createTask",
    async ({ data, token, idProject }, thunkApi) => {
        try {
            const res = await postApi(`project/${idProject}/task`, data, token);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const createTaskComment = createAsyncThunk(
    "users/createTaskComment",
    async ({ data, token, idProject, idTask }, thunkApi) => {
        try {
            const res = await postApi(
                `project/${idProject}/task/${idTask}/comment`,
                data,
                token
            );
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const updateTask = createAsyncThunk(
    "users/updateTask",
    async ({ data, token, idProject, idTask }, thunkApi) => {
        try {
            const res = await patchApi(
                `project/${idProject}/task/${idTask}`,
                data,
                token
            );
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const createColumn = createAsyncThunk(
    "users/createColumn",
    async ({ data, token, idProject }, thunkApi) => {
        try {
            const res = await postApi(
                `project/${idProject}/column`,
                data,
                token
            );
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

const updateColumn = createAsyncThunk(
    "users/updateColumn",
    async ({ token, sourceColumnData, desColumnData, idProject }, thunkApi) => {
        try {
            const res1 = await patchApi(
                `project/${idProject}/column/${sourceColumnData.id}`,
                sourceColumnData.data,
                token
            );

            if (!desColumnData) return [res1.data];

            const res2 = await patchApi(
                `project/${idProject}/column/${desColumnData.id}`,
                desColumnData.data,
                token
            );

            return [res1.data, res2.data];
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export {
    createTask,
    updateColumn,
    createColumn,
    updateTask,
    createTaskComment,
};
