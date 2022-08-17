import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api";

const updateProfile = createAsyncThunk(
    "users/updateProfile",
    async ({ data, token, id }, thunkApi) => {
        try {
            const res = await postApi(`/profile/${id}`, data, token);
            return res.data;
        } catch (error) {
            const errMsg = error.response.data.err || error.message;
            return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export default updateProfile;
