import { createSlice } from "@reduxjs/toolkit";
import login from "./thunk/login";
import register from "./thunk/register";
import refreshToken from "./thunk/refreshToken";

const initialState = {
    user: null,
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                localStorage.setItem("logger", action.payload.accessToken);
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                localStorage.setItem("logger", action.payload.accessToken);
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                localStorage.setItem("logger", action.payload.accessToken);
            });
    },
});

export default authSlice.reducer;
