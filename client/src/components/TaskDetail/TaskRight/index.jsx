import React, { useState } from "react";
import "./style.scss";
import "../TaskList/DatePicker.scss";
import "../TaskList/Calender.scss";
import DatePicker from "react-date-picker";
import { useSelector, useDispatch } from "react-redux";
import CustomTitleModel from "./CustomTitleModel";
import CustomDecModel from "./CustomDecModel";

import { updateTask } from "../../../redux/thunk/column";

const TaskRight = () => {
    const dispatch = useDispatch();
    const { auth, project, task } = useSelector((state) => state);
    const [value, setValue] = useState(
        task.data?.deadline ? new Date(task.data?.deadline) : null
    );
    const countWork = task.data?.works.length;
    const countWorkComplete = task.data?.works.filter(
        (el) => el.isComplete === true
    ).length;
    const progress =
        countWork === 0
            ? 0
            : ((countWorkComplete / countWork) * 100).toFixed(2);

    const [titleModel, setTitleModel] = useState(false);
    const [dataTitle, setDataTitle] = useState({ title: task.data.title });
    function onChangeInputDataTitle(e) {
        const { name, value } = e.target;
        setDataTitle({ ...dataTitle, [name]: value });
    }
    function onSubmitDataTitle(e) {
        e.preventDefault();
        dispatch(
            updateTask({
                data: dataTitle,
                token: auth.token,
                idProject: project.data._id,
                idTask: task.data._id,
            })
        );
        setDataTitle({ title: "" });
        closeTitleModel();
    }
    function closeTitleModel() {
        setTitleModel(false);
    }

    const [decModel, setDecModel] = useState(false);
    const [dataDec, setDataDec] = useState({ dec: task.data.dec });
    function onChangeInputDataDec(e) {
        const { name, value } = e.target;
        setDataDec({ ...dataDec, [name]: value });
    }
    function onSubmitDataDec(e) {
        e.preventDefault();
        dispatch(
            updateTask({
                data: dataDec,
                token: auth.token,
                idProject: project.data._id,
                idTask: task.data._id,
            })
        );
        setDataDec({ dec: "" });
        closeDecModel();
    }
    function closeDecModel() {
        setDecModel(false);
    }

    function onChangeDeadline(e) {
        setValue(e);
        dispatch(
            updateTask({
                data: {
                    deadline: e,
                },
                token: auth.token,
                idProject: project.data._id,
                idTask: task.data._id,
            })
        );
    }

    return (
        <div className="taskRight">
            {titleModel && (
                <CustomTitleModel
                    close={closeTitleModel}
                    data={dataTitle}
                    onChangeInput={onChangeInputDataTitle}
                    onSubmit={onSubmitDataTitle}
                />
            )}
            {decModel && (
                <CustomDecModel
                    close={closeDecModel}
                    data={dataDec}
                    onChangeInput={onChangeInputDataDec}
                    onSubmit={onSubmitDataDec}
                />
            )}
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-copy-alt"></i>
                </div>
                <p>T??n nhi???m v???</p>
            </div>
            <div className="taskRight__title ml-40">
                {" "}
                <p>{task.data.title}</p>
                <button
                    className="btn contain"
                    onClick={() => setTitleModel(true)}
                >
                    Thay ?????i
                </button>
            </div>
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-captions"></i>
                </div>
                <p>M?? t??? nhi???m v???</p>
            </div>
            <div className="taskRight__dec ml-40">
                <p>{task.data.dec}</p>
                <button
                    className="btn contain"
                    onClick={() => setDecModel(true)}
                >
                    Thay ?????i
                </button>
            </div>
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-scatter-chart"></i>
                </div>
                <p>Ti???n ?????</p>
            </div>
            <div className="taskRight__params ml-40">
                <div className="taskRight__params-item">
                    <h4>T???ng s??? c??ng vi???c c???n l??m</h4>
                    <p>{countWork}</p>
                </div>
                <div className="taskRight__params-item">
                    <h4>S??? c??ng vi???c ???? ho??n</h4>
                    <p>{countWorkComplete}</p>
                </div>
                <div className="taskRight__params-item">
                    <h4>Th???i gian ho??n th??nh</h4>
                    <p>13h 34m</p>
                </div>
            </div>
            <div
                className="taskRight__progress"
                style={{ "--progress": `${progress}%` }}
            >
                <div className="taskRight__progress-item  ml-40">
                    <p>{progress}%</p>
                </div>
            </div>
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-label"></i>
                </div>
                <p>Nh??n</p>
            </div>
            <div className="taskRight__tag ml-40">
                <div className={`taskRight__tag-item bg-${task.data.color}`}>
                    {task.data.tag}
                </div>
                <button className="btn contain">Thay ?????i</button>
            </div>
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-flag"></i>
                </div>
                <p>Th???i gian ho??n th??nh</p>
            </div>
            <div className="taskRight__date ml-40">
                <DatePicker value={value} onChange={onChangeDeadline} />
            </div>
            <div className="taskRight__name">
                <div className="taskRight__name-icon">
                    <i className="bx bx-group"></i>
                </div>
                <p>Th??nh vi??n</p>
            </div>

            <div className="taskRight__members ml-40">
                <div className="members">
                    {members.slice(0, 4).map((e, i) => {
                        return (
                            <div className="avatar" key={i}>
                                <img src={e.avatar} alt="" />
                            </div>
                        );
                    })}
                    {members.length > 4 && (
                        <div className="avatar">
                            <div className="more">+{members.length - 4}</div>
                        </div>
                    )}
                </div>
                <button className="btn contain">Qu???n l?? th??nh vi??n</button>
            </div>
        </div>
    );
};

export default TaskRight;

let members = [
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
    {
        avatar: "https://images.pexels.com/photos/8145352/pexels-photo-8145352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint",
    },
];
