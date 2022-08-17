import { useState } from "react";
import Task from "../Task";
import "./style.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../redux/thunk/column";
import CustomMolDel from "./CustomMoldel";
import TitleInput from "./TitleInput";

const Column = ({ column, index }) => {
    const {
        project: { data: projectData },
        auth,
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [titleInput, setTitleInput] = useState(false);

    const [model, setModel] = useState(false);
    const colors = ["pink", "green", "blue", "yellow", "violet"];
    const [colorChoice, setColorChoice] = useState("pink");
    const [data, setData] = useState({
        title: "",
        dec: "",
        tag: "",
    });

    function onChangeInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }
    function close() {
        setModel(false);
        setData({
            title: "",
            dec: "",
            tag: "",
        });
        setColorChoice("pink");
    }

    function onSubmit(e) {
        e.preventDefault();
        let newTask = {
            ...data,
            color: colorChoice,
            column: column._id,
            project: projectData._id,
        };
        let content = `đã thêm nhiệm vụ ${data.title} vào cột ${column.title}`;
        dispatch(
            createTask({
                data: newTask,
                token: auth.token,
                idProject: projectData._id,
                content,
            })
        );
        close();
    }

    return (
        <>
            {model && (
                <CustomMolDel
                    close={close}
                    colors={colors}
                    colorChoice={colorChoice}
                    setColorChoice={setColorChoice}
                    onSubmit={onSubmit}
                    data={data}
                    onChangeInput={onChangeInput}
                />
            )}
            <Draggable draggableId={column._id} index={index}>
                {(provided) => (
                    <div
                        className="column"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div
                            className="column__header"
                            {...provided.dragHandleProps}
                        >
                            {titleInput === false ? (
                                <>
                                    <h3
                                        onClick={() => setTitleInput(true)}
                                        className="column__header-name"
                                    >
                                        {column.title}
                                    </h3>
                                    <p className="column__header-number">
                                        {column.tasks.length}
                                    </p>
                                </>
                            ) : (
                                <TitleInput
                                    setTitleInput={setTitleInput}
                                    defaultValue={column.title}
                                    column={column}
                                />
                            )}
                            <div
                                className="column__header-add-task"
                                onClick={() => setModel(true)}
                            >
                                <i className="bx bx-plus"></i>
                            </div>
                        </div>
                        <Droppable droppableId={column._id} type="task">
                            {(provided) => (
                                <div
                                    className="column__tasks"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {column?.taskOrder
                                        .map((id) =>
                                            column.tasks.find(
                                                (e) => e._id === id
                                            )
                                        )
                                        .map((e, i) => (
                                            <Task
                                                key={e._id}
                                                task={e}
                                                index={i}
                                            />
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default Column;
