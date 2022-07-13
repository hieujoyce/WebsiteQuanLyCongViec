import React, { useEffect } from "react";
import BoardContend from "../../components/BoardContent";
import "./style.scss";
import { useParams } from "react-router-dom";
import { getApi } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { initProject } from "../../redux/projectSlice";
import Header from "./Header";

const Board = () => {
    const { id } = useParams();
    const {
        project: { data },
        auth,
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id === data?._id) return;
        dispatch(initProject(null));
        getApi(`/project/${id}`, auth.token)
            .then((res) => {
                dispatch(initProject(res.data.project));
            })
            .catch((err) => {
                toast.error(err.response.data.err);
            });
    }, [id, auth.token, dispatch, data?._id]);

    return (
        <div className="board">
            <Header project={data} />
            <BoardContend />
        </div>
    );
};

export default Board;
