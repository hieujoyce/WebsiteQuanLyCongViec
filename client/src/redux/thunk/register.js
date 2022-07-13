import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api";

const register = createAsyncThunk("users/register", async (data, thunkApi) => {
    try {
        const res = await postApi("/register", data);
        return res.data;
    } catch (error) {
        const errMsg = error.response.data.err || error.message;
        return thunkApi.rejectWithValue(errMsg);
    }
});

export default register;
