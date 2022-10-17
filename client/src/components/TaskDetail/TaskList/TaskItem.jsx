import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-date-picker";
import "./DatePicker.scss";
import "./Calender.scss";
import CustomDeleteModel from "./CustomDeleteModel";
import { deleteApi, patchApi, postApi } from "../../../utils/api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { deleteWork, updateWork } from "../../../redux/taskSlice";
import { updateProjectWork } from "../../../redux/projectSlice";

const TaskItem = ({ index, workData }) => {
    const inputCheckRef = useRef(null);
    const [value, setValue] = useState(
        workData.deadline ? new Date(workData.deadline) : null
    );
    const [modelDelete, setModelDelete] = useState(false);
    const [workLoading, setWorkLoading] = useState(!workData._id);
    const dispatch = useDispatch();
    const { auth, project, task } = useSelector((state) => state);

    function onChangeInputCheck(e) {
        setWorkLoading(true);
        const checked = e.target.checked;
        patchApi(
            `/project/${project.data?._id}/task/${task.data?._id}/work/${workData._id}`,
            { isComplete: checked },
            auth.token
        )
            .then((res) => {
                dispatch(updateWork(res.data.work));
                dispatch(updateProjectWork(res.data.work));
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.err);
            })
            .finally(() => {
                setWorkLoading(false);
            });
        let content = `đã ${checked ? "" : "bỏ"} tích chọn công việc ${
            workData.title
        } trong thẻ ${task.data?.title}`;
        postApi(
            "/activate",
            { content, project: project.data?._id },
            auth.token
        );
    }

    function onChangeDeadline(e) {
        setValue(e);
        setWorkLoading(true);
        patchApi(
            `/project/${project.data._id}/task/${task.data._id}/work/${workData._id}`,
            { deadline: e },
            auth.token
        )
            .then((res) => {
                dispatch(updateWork(res.data.work));
            })
            .catch((err) => {
                toast.error(err.response.data.msg);
            })
            .finally(() => {
                setWorkLoading(false);
            });
    }

    useEffect(() => {
        setWorkLoading(!workData._id);
    }, [workData._id]);
    function closeModelDelete() {
        setModelDelete(false);
    }

    function onClickDelete() {
        dispatch(deleteWork(workData._id));
        deleteApi(
            `/project/${project.data._id}/task/${task.data._id}/work/${workData._id}`,
            auth.token
        )
            .then((res) => {
                toast.success(res.data.msg);
            })
            .catch((err) => {
                toast.error(err.response.data.msg);
            });
        let content = `đã xóa công việc ${workData.title} trong thẻ ${task.data?.title}`;
        postApi(
            "/activate",
            { content, project: project.data?._id },
            auth.token
        );
        setModelDelete(false);
    }

    return (
        <li className={`taskList__item ${workLoading ? "work-loading" : ""}`}>
            {modelDelete && (
                <CustomDeleteModel
                    close={closeModelDelete}
                    onClickDelete={onClickDelete}
                />
            )}
            <div className="row">
                <div className="col-1">
                    <input
                        ref={inputCheckRef}
                        type="checkbox"
                        defaultChecked={!!workData.isComplete}
                        onChange={onChangeInputCheck}
                    />
                    <h3 className="taskList__item-stt">{index}.</h3>
                </div>
                <div className="col-8">
                    <p
                        className={`taskList__item-name ${
                            !inputCheckRef.current
                                ? workData.isComplete
                                    ? "line-through"
                                    : ""
                                : inputCheckRef.current.checked
                                ? "line-through"
                                : ""
                        }`}
                    >
                        {workData.title}
                    </p>
                    <div className="row">
                        {value && (
                            <div
                                className={`taskList__item-date ${
                                    value > new Date() ? "bg-green" : "bg-pink"
                                }`}
                            >
                                <i className="bx bx-time-five"></i>
                                <p>
                                    {value?.toLocaleString().split(",")[0] ||
                                        ""}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-3">
                    <div className="row jus-end">
                        <DatePicker onChange={onChangeDeadline} value={value} />
                        <div className="taskList__item-btns">
                            <button
                                className="btn delete"
                                onClick={() => setModelDelete(true)}
                            >
                                <i className="bx bx-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default TaskItem;
