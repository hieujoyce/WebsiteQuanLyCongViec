import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Loading/Spinner";
import { getApi } from "../../utils/api";
import { toast } from "react-toastify";
import {
    createProject,
    updateProject,
    deleteProject,
} from "../../redux/thunk/project";
import CustomMoDel from "./CustomModel";
import CustomDeleteModel from "./CustomDeleteModel";

const BoardHome = () => {
    const [projects, setProjects] = useState(null);
    const [model, setModel] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);

    const [idUpdate, setIdUpdate] = useState();
    const [idDelete, setIdDelete] = useState();

    const [data, setData] = useState({
        title: "",
        dec: "",
        img: "",
    });
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    function onChangeInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        dispatch(createProject({ data, token: auth.token, setProjects }));
        close();
    }

    async function onSubmitUpdate(e) {
        e.preventDefault();
        dispatch(
            updateProject({
                data,
                token: auth.token,
                setProjects,
                id: idUpdate,
            })
        );
        closeUpdate();
    }

    function close() {
        setModel(false);
    }

    function closeUpdate() {
        setUpdate(false);
    }

    function closeDeleteModel() {
        setDeleteModel(false);
    }

    function onClickUpdate(e, data, id) {
        e.preventDefault();
        setData(data);
        setIdUpdate(id);
        setUpdate(true);
    }

    function onClickDeleteModel(e, id) {
        e.preventDefault();
        setIdDelete(id);
        setDeleteModel(true);
    }

    function onClickDelete() {
        dispatch(
            deleteProject({
                token: auth.token,
                setProjects,
                id: idDelete,
            })
        );

        closeDeleteModel();
    }

    useEffect(() => {
        getApi("/projects", auth.token)
            .then((res) => {
                setProjects(res.data.projects);
            })
            .catch((err) => {
                toast.error(err.response.data.err);
            });
    }, [auth.token]);

    return (
        <div className="board-home">
            {model && (
                <CustomMoDel
                    close={close}
                    data={data}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    txtBtn={"Thêm dự án"}
                />
            )}
            {update && (
                <CustomMoDel
                    close={closeUpdate}
                    data={data}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmitUpdate}
                    txtBtn={"Cập nhật dự án"}
                />
            )}
            {deleteModel && (
                <CustomDeleteModel
                    msg={"Bạn có chắc chắn muốn xóa dự án này?"}
                    close={closeDeleteModel}
                    onClickDelete={onClickDelete}
                />
            )}
            <div className="board-home__header">
                <h2>
                    <span className="active">Dự án</span>
                </h2>
            </div>
            <div className="board-home__body">
                {projects ? (
                    <div className="projects">
                        {projects?.map((e, i) => (
                            <Link
                                to={`/board/${e._id}`}
                                className="project"
                                key={i}
                            >
                                {e.userOwner === auth.user._id && (
                                    <div className="project__icons">
                                        <i
                                            onClick={(ev) =>
                                                onClickUpdate(
                                                    ev,
                                                    {
                                                        title: e.title,
                                                        dec: e.dec,
                                                        img: e.img,
                                                    },
                                                    e._id
                                                )
                                            }
                                            className="bx bxs-edit-alt"
                                        ></i>
                                        <i
                                            onClick={(ev) =>
                                                onClickDeleteModel(ev, e._id)
                                            }
                                            className="bx bxs-trash"
                                        ></i>
                                    </div>
                                )}
                                <div className="project__img">
                                    <img src={e.img} alt="" />
                                </div>
                                <div className="project__info">
                                    <h3 className="name">{e.title}</h3>
                                    <p className="dec">{e.dec}</p>
                                </div>
                            </Link>
                        ))}

                        <div
                            className="add-project"
                            onClick={() => {
                                setData({
                                    title: "",
                                    dec: "",
                                    img: "",
                                });
                                setModel(true);
                            }}
                        >
                            <i className="bx bx-plus-circle"></i>
                        </div>
                    </div>
                ) : (
                    <div className="container-spinner">
                        <Spinner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardHome;
