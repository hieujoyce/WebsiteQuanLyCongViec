import { createSlice } from "@reduxjs/toolkit";
import {
    createTask,
    updateColumn,
    createColumn,
    updateTask,
    deleteTask,
} from "./thunk/column";
import { updateProjectColumnOrder, updateProjectv2 } from "./thunk/project";

const initialState = {
    data: null,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        initProject: (state, action) => {
            state.data = action.payload;
        },
        updateProjectWork: (state, action) => {
            let columnId;
            state.data.columns.forEach((el) => {
                el.tasks.forEach((el1) => {
                    if (el1._id === action.payload.task) {
                        columnId = el._id;
                    }
                });
            });
            let findColumn = state.data.columns.find(
                (el) => el._id === columnId
            );
            let findTask = findColumn.tasks.find(
                (el) => el._id === action.payload.task
            );
            findTask.works = findTask.works.map((el) =>
                el._id === action.payload._id ? action.payload : el
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProjectv2.fulfilled, (state, action) => {
                state.data = action.payload.project;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.data.columns.forEach((el) => {
                    el.tasks = el.tasks.filter(
                        (el1) => el1._id !== action.payload.idTask
                    );
                    el.taskOrder = el.taskOrder.filter(
                        (el1) => el1 !== action.payload.idTask
                    );
                });
            })
            .addCase(createColumn.fulfilled, (state, action) => {
                state.data.columnOrder.push(action.payload.column._id);
                state.data.columns.push(action.payload.column);
            })
            .addCase(createTask.fulfilled, (state, action) => {
                let findColumn = state.data.columns.find(
                    (el) => el._id === action.payload.task.column
                );
                findColumn.tasks.push(action.payload.task);
                findColumn.taskOrder.push(action.payload.task._id);
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                action.payload.forEach((el) => {
                    state.data.columns = state.data.columns.map((el1) =>
                        el1._id !== el.column._id ? el1 : el.column
                    );
                });
            })
            .addCase(updateProjectColumnOrder.fulfilled, (state, action) => {
                state.data.columnOrder = [
                    ...action.payload.project.columnOrder,
                ];
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                let columnId;
                state.data.columns.forEach((el) => {
                    el.tasks.forEach((el1) => {
                        if (el1._id === action.payload.task._id) {
                            columnId = el._id;
                        }
                    });
                });
                let findColumn = state.data.columns.find(
                    (el) => el._id === columnId
                );

                findColumn.tasks = findColumn.tasks.map((el) =>
                    el._id === action.payload.task._id
                        ? action.payload.task
                        : el
                );
            });
    },
});

export const { initProject, updateProjectWork } = projectSlice.actions;

export default projectSlice.reducer;
