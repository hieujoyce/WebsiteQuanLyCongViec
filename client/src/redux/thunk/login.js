import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api";

const login = createAsyncThunk("users/login", async (data, thunkApi) => {
    try {
        const res = await postApi("/login", data);
        return res.data;
    } catch (error) {
        const errMsg = error.response.data.err || error.message;
        return thunkApi.rejectWithValue(errMsg);
    }
});

export default login;
