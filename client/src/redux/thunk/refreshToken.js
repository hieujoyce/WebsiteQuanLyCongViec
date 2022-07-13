import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api";

const refreshToken = createAsyncThunk(
    "users/refreshToken",
    async (data, thunkApi) => {
        try {
            const res = await postApi("/refreshToken", data);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export default refreshToken;
