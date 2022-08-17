import React, { useRef, useState } from "react";
import "./style.scss";
import Model from "../../../components/Model";
import { useSelector, useDispatch } from "react-redux";
import { updateProjectv2 } from "../../../redux/thunk/project";
import { getApi } from "../../../utils/api";
import { toast } from "react-toastify";
import CustomDeleteModel from "../../BoardHome/CustomDeleteModel";

const ManagerMembers = ({ close }) => {
    const [value, setValue] = useState("");
    const { project, auth } = useSelector((state) => state);
    const timeOutRef = useRef(null);
    const [resultMembers, setResultMembers] = useState([]);
    const dispatch = useDispatch();
    const [modelDelete, setModelDelete] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState(null);

    function closeModelDelete() {
        setModelDelete(false);
    }

    function handleAddUser(id, username) {
        dispatch(
            updateProjectv2({
                data: {
                    members: [...project.data.members, id],
                },
                token: auth.token,
                idProject: project.data._id,
                content: `đã thêm ${username} vào dự án`,
            })
        );
        setValue("");
        setResultMembers([]);
    }

    function handleRemoveUser() {
        let cloneArr = [...project.data.members];
        let username = cloneArr.find((el) => el._id === idUserDelete).username;
        let newMembers = cloneArr.filter((el) => el._id !== idUserDelete);

        dispatch(
            updateProjectv2({
                data: {
                    members: newMembers,
                },
                token: auth.token,
                idProject: project.data._id,
                content: `đã xóa ${username} ra khỏi dự án`,
            })
        );
        setModelDelete(false);
    }

    function handleAddAdmins(id) {
        let newAdmins = [...project.data.admins, id];
        let cloneArr = [...project.data.members];
        let username = cloneArr.find((el) => el._id === id).username;

        dispatch(
            updateProjectv2({
                data: {
                    admins: newAdmins,
                },
                token: auth.token,
                idProject: project.data._id,
                content: `đã cho ${username} lên làm quản trị viên`,
            })
        );
    }

    function onChangeInput(e) {
        const value = e.target.value;
        if (timeOutRef) {
            clearTimeout(timeOutRef.current);
        }
        setValue(value);
        if (value === "") {
            setResultMembers([]);
            return;
        }
        timeOutRef.current = setTimeout(() => {
            getApi(`/searchUser?search=${value}`, auth.token)
                .then((res) => {
                    setResultMembers(res.data.searchUsers);
                })
                .catch((err) => {
                    toast.error(err.response.data.err);
                });
        }, 500);
    }

    return (
        <Model close={close}>
            {modelDelete && (
                <CustomDeleteModel
                    close={closeModelDelete}
                    onClickDelete={handleRemoveUser}
                    msg={
                        "Bạn có chắc chắn muốn loại thành viên này ra khỏi dự án?"
                    }
                />
            )}
            <div className="managerMembers">
                <h2>Quản lý thành viên</h2>
                <h3>{project.data.title}</h3>
                <div className="input-group managerMembers__input">
                    <input
                        type="text"
                        placeholder="Nhập tên thành viên"
                        value={value}
                        onChange={onChangeInput}
                    />
                    <i className="bx bx-search-alt"></i>
                    {resultMembers.length > 0 && (
                        <ul className="managerMembers__input-result">
                            {resultMembers.map((el, i) => (
                                <li key={i}>
                                    <div className="avatar">
                                        <img src={el.avatar} alt="" />
                                    </div>
                                    <p>{el.username}</p>
                                    {project.data.members.findIndex(
                                        (el1) => el1._id === el._id
                                    ) === -1 && (
                                        <div
                                            onClick={() =>
                                                handleAddUser(
                                                    el._id,
                                                    el.username
                                                )
                                            }
                                            className="add-user"
                                        >
                                            <i className="bx bx-user-plus"></i>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="managerMembers__members">
                    <p className="managerMembers__members-title">
                        Tổng: {project.data?.members.length} thành viên
                    </p>
                    <ul>
                        {project.data?.members.map((el, i) => (
                            <li key={i} className="managerMembers__member">
                                <div className="managerMembers__member-avatar">
                                    <img src={el.avatar} alt="" />
                                </div>
                                <div className="managerMembers__member-infor">
                                    <h4 className="managerMembers__member-infor__name">
                                        {el.username}
                                    </h4>
                                    <p className="managerMembers__member-infor__email">
                                        hieujoycedev@gmail.com
                                    </p>
                                </div>
                                {project.data?.admins.includes(el._id) && (
                                    <div className="managerMembers__member-admin">
                                        Quản trị viên
                                    </div>
                                )}
                                <div className="managerMembers__member-icons dropdown">
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                    <div className="dropdown__content">
                                        {!project.data?.admins.includes(
                                            el._id
                                        ) && (
                                            <>
                                                <div
                                                    className="item"
                                                    onClick={() => {
                                                        handleAddAdmins(el._id);
                                                    }}
                                                >
                                                    <i className="bx bx-user-circle"></i>
                                                    <p>Lên leader</p>
                                                </div>
                                                <div className="line">
                                                    <div></div>
                                                </div>
                                                <div
                                                    className="item"
                                                    onClick={() => {
                                                        setIdUserDelete(el._id);
                                                        setModelDelete(true);
                                                    }}
                                                >
                                                    <i className="bx bx-log-out"></i>
                                                    <p>Loại thành viên</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Model>
    );
};

export default ManagerMembers;
