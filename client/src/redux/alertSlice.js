import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith("users/") &&
                        action.type.endsWith("/pending")
                    );
                },
                (state, action) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith("users/") &&
                        action.type.endsWith("/fulfilled")
                    );
                },
                (state, action) => {
                    state.loading = false;
                    if (action.payload.msg) toast.success(action.payload.msg);
                }
            )
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith("users/") &&
                        action.type.endsWith("/rejected")
                    );
                },
                (state, action) => {
                    state.loading = false;
                    toast.error(action.payload);
                }
            );
    },
});

export default alertSlice.reducer;
