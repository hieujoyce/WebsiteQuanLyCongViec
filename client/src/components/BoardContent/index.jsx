import React from "react";
import Column from "../Column";
import "./style.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Loading/Spinner";
import { updateColumn } from "../../redux/thunk/column";
import { updateProjectColumnOrder } from "../../redux/thunk/project";

const BoardContend = () => {
    const { data: project } = useSelector((state) => state.project);
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;
        if (type === "task") {
            let cloneProject = JSON.parse(JSON.stringify(project));
            if (destination.droppableId === source.droppableId) {
                let dragColumn = cloneProject.columns.find(
                    (e) => e._id === destination.droppableId
                );
                dragColumn.taskOrder.splice(source.index, 1);
                dragColumn.taskOrder.splice(destination.index, 0, draggableId);
                const data = {
                    title: dragColumn.title,
                    taskOrder: [...dragColumn.taskOrder],
                    tasks: dragColumn.tasks.map((el) => el._id),
                };
                dispatch(
                    updateColumn({
                        token: auth.token,
                        sourceColumnData: {
                            id: dragColumn._id,
                            data,
                        },
                        idProject: project._id,
                    })
                );
            } else {
                let sourceColumn = cloneProject.columns.find(
                    (e) => e._id === source.droppableId
                );
                let desColumn = cloneProject.columns.find(
                    (e) => e._id === destination.droppableId
                );
                sourceColumn.taskOrder.splice(source.index, 1);
                let dragTask = sourceColumn.tasks.find(
                    (e) => e._id === draggableId
                );
                desColumn.taskOrder.splice(destination.index, 0, draggableId);
                desColumn.tasks.push(dragTask);

                const dataSource = {
                    title: sourceColumn.title,
                    taskOrder: [...sourceColumn.taskOrder],
                    tasks: sourceColumn.tasks
                        .filter((e) => e._id !== draggableId)
                        .map((e) => e._id),
                };

                const dataDes = {
                    title: desColumn.title,
                    taskOrder: [...desColumn.taskOrder],
                    tasks: desColumn.tasks.map((e) => e._id),
                };
                dispatch(
                    updateColumn({
                        token: auth.token,
                        sourceColumnData: {
                            id: sourceColumn._id,
                            data: dataSource,
                        },
                        desColumnData: {
                            id: desColumn._id,
                            data: dataDes,
                        },
                        idProject: project._id,
                    })
                );
            }
        } else if (type === "column") {
            let cloneProject = JSON.parse(JSON.stringify(project));
            cloneProject.columnOrder.splice(source.index, 1);
            cloneProject.columnOrder.splice(destination.index, 0, draggableId);
            // setBoard(cloneProject);
            dispatch(
                updateProjectColumnOrder({
                    data: { columnOrder: [...cloneProject.columnOrder] },
                    token: auth.token,
                    id: project._id,
                })
            );
        } else {
            return;
        }
    }

    if (!project) {
        return <Spinner />;
    }

    return (
        <div className="board-content">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <div
                            className="list-column"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {project?.columnOrder
                                .map((id) =>
                                    project.columns.find((e) => e._id === id)
                                )
                                .map((e, i) => (
                                    <Column key={e._id} column={e} index={i} />
                                ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default BoardContend;
