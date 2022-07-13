import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    project: projectReducer,
    task: taskReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export { store };
