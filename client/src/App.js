import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import RequireAuth from "./components/RequireAuth";
import { Activate, Login, NotFound, Register } from "./pages";
import { useDispatch } from "react-redux";
import refreshToken from "./redux/thunk/refreshToken";
import Board from "./pages/Board";
import BoardHome from "./pages/BoardHome";
import TaskDetail from "./pages/TaskDetail";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = localStorage.getItem("logger");
        dispatch(refreshToken({ accessToken }));
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <DefaultLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<BoardHome />} />
                <Route
                    path="/board/:idBoard/task/:idTask"
                    element={<TaskDetail />}
                />
                <Route path="/board/:id" element={<Board />} />
                <Route path="/board" element={<BoardHome />} />
                <Route path="/activate" element={<Activate />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
