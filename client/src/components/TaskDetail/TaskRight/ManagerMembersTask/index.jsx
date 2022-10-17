import React, { useRef, useState } from "react";
import Model from "../../../Model";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../../../redux/thunk/column";

const ManagerMemberTask = ({ close }) => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const { task, project, auth } = useSelector((state) => state);
    const [resultMembers, setResultMembers] = useState([]);
    const timeOutRef = useRef(null);
    function handleAddUser(id, username) {
        dispatch(
            updateTask({
                data: {
                    members: [...task.data.members.map((el) => el._id), id],
                },
                token: auth.token,
                idProject: project.data._id,
                idTask: task.data._id,
                content: `đã thêm ${username} vào nhiệm vụ ${task.data.title}`,
            })
        );
        setValue("");
        setResultMembers([]);
    }

    function handleRemoveUser(id, username) {
        let members = task.data.members
            .map((el) => el._id)
            .filter((el) => el !== id);

        dispatch(
            updateTask({
                data: {
                    members,
                },
                token: auth.token,
                idProject: project.data._id,
                idTask: task.data._id,
                content: `đã xóa ${username} khỏi nhiệm vụ ${task.data.title}`,
            })
        );
        setValue("");
        setResultMembers([]);
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
            let searchUser = project.data.members.filter((el) =>
                el.username.startsWith(value)
            );
            setResultMembers(searchUser);
        }, 500);
    }

    return (
        <Model close={close}>
            <div className="managerMembers">
                <h2>Quản lý thành viên</h2>
                <h3>{task.data.title}</h3>
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
                                    {task.data.members.findIndex(
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
                        Tổng: {task.data?.members.length} thành viên
                    </p>
                    <ul>
                        {task.data?.members.map((el, i) => (
                            <li key={i} className="managerMembers__member">
                                <div className="managerMembers__member-avatar">
                                    <img src={el.avatar} alt="" />
                                </div>
                                <div className="managerMembers__member-infor">
                                    <h4 className="managerMembers__member-infor__name">
                                        {el.username}
                                    </h4>
                                    <p className="managerMembers__member-infor__email">
                                        {el.email}
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
                                                    onClick={() =>
                                                        handleRemoveUser(
                                                            el._id,
                                                            el.username
                                                        )
                                                    }
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

export default ManagerMemberTask;
