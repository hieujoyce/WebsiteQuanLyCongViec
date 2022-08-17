import React, { useState } from "react";
import "./style.scss";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { addWork, addWorkReplace } from "../../../redux/taskSlice";
import CustomAddMoDel from "./CustomAddModel";
import { postApi } from "../../../utils/api";
import { toast } from "react-toastify";

const TaskList = () => {
    const { task, auth, project } = useSelector((state) => state);
    const [show, setShow] = useState(true);
    const [modelAdd, setModelAdd] = useState(false);
    const [data, setData] = useState({ title: "" });
    const dispatch = useDispatch();

    function onChangeInput(e) {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    }

    function close() {
        setModelAdd(false);
    }

    function onSubmit(e) {
        e.preventDefault();
        setData({ title: "" });
        dispatch(addWork({ ...data, task: task.data._id }));
        postApi(
            `/project/${project.data._id}/task/${task.data._id}/work`,
            data,
            auth.token
        )
            .then((res) => dispatch(addWorkReplace(res.data.work)))
            .catch((err) => {
                toast.error(err.response.data.err);
            });
        let content = `đã thêm công việc ${data.title} trong thẻ ${task.data?.title}`;
        postApi(
            "/activate",
            { content, project: project.data?._id },
            auth.token
        );
        setModelAdd(false);
    }

    return (
        <div className="taskList">
            {modelAdd && (
                <CustomAddMoDel
                    close={close}
                    data={data}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    txtBtn="Thêm công việc"
                />
            )}
            <h2 className="taskList__title">
                Danh sách các công việc cần làm{" "}
                <span>{task.data.countWork}</span>
            </h2>
            <div className="taskList__add" onClick={() => setModelAdd(true)}>
                Thêm công việc
            </div>
            {show && (
                <ul>
                    {task.data.works.map((el, i) => (
                        <TaskItem key={i} index={i + 1} workData={el} />
                    ))}
                </ul>
            )}
            {show ? (
                <div className="taskList__add" onClick={() => setShow(false)}>
                    Ẩn tất cả công việc
                </div>
            ) : (
                <div className="taskList__add" onClick={() => setShow(true)}>
                    Hiển thi tất cả công việc
                </div>
            )}
        </div>
    );
};

export default TaskList;
