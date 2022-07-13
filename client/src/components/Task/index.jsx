import React from "react";
import "./style.scss";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

const Task = ({ task, index }) => {
    const navigate = useNavigate();
    const countWork = task.works.length;
    const countWorkComplete = task.works.filter(
        (el) => el.isComplete === true
    ).length;

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    onClick={() => navigate(`task/${task._id}`)}
                    className={`task ${
                        task._id === "loading" ? "loading" : ""
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="task__header">
                        <div className={`task__header-tag bg-${task.color}`}>
                            {task.tag}
                        </div>
                        <div className="task__header-icon">
                            <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                    </div>
                    <div className="task__body">
                        <h3 className="task__body-name">{task.title}</h3>
                        <p className="task__body-dec">{task.dec}</p>
                        {task.deadline && (
                            <div className="task__body-date">
                                <i className="bx bxs-flag"></i>
                                <p>{task.deadline?.substring(0, 10)}</p>
                            </div>
                        )}
                    </div>

                    <div className="task__footer">
                        <div className="members">
                            {members.slice(0, 4).map((e, i) => {
                                return (
                                    <div className="avatar" key={i}>
                                        <img src={e} alt="" />
                                    </div>
                                );
                            })}
                            {members.length > 4 && (
                                <div className="avatar">
                                    <div className="more">
                                        +{members.length - 4}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="task__footer-right">
                            <div className="task__footer-right__item">
                                <i className="bx bx-check-circle"></i>
                                <p>
                                    {countWorkComplete}/{countWork}
                                </p>
                            </div>

                            <div className="task__footer-right__item">
                                <i className="bx bx-message-dots"></i>
                                <p>{task.comments.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;

let members = [
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1600",
];
