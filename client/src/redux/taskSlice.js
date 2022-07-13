import { createSlice } from "@reduxjs/toolkit";
import { createTaskComment, updateTask } from "./thunk/column";

const initialState = {
    data: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        initTask: (state, action) => {
            state.data = action.payload;
        },
        addWork: (state, action) => {
            state.data.countWork++;
            state.data.works.push(action.payload);
        },
        addWorkReplace: (state, action) => {
            state.data.works.pop();
            state.data.works.push(action.payload);
        },
        deleteWork: (state, action) => {
            state.data.countWork--;
            state.data.works = state.data.works.filter(
                (el) => el._id !== action.payload
            );
        },
        updateWork: (state, action) => {
            state.data.works = state.data.works.map((el) =>
                el._id === action.payload._id ? action.payload : el
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTask.fulfilled, (state, action) => {
                state.data = action.payload.task;
            })
            .addCase(createTaskComment.fulfilled, (state, action) => {
                state.data.comments.unshift(action.payload.comment);
            });
    },
});

export const { initTask, addWork, addWorkReplace, deleteWork, updateWork } =
    taskSlice.actions;

export default taskSlice.reducer;
