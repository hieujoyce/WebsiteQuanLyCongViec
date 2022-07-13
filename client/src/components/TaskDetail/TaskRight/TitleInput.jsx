import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateColumn } from "../../redux/thunk/column";

const TitleInput = ({ defaultValue, setTitleInput, column }) => {
    const formRef = useRef(null);
    const [value, setValue] = useState(defaultValue);
    const dispatch = useDispatch();
    const { auth, project } = useSelector((state) => state);
    useEffect(() => {
        formRef.current.firstChild.focus();
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setTitleInput(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setTitleInput]);

    function onChangeInput(e) {
        setValue(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            title: value,
            taskOrder: [...column.taskOrder],
            tasks: column.tasks.map((e) => e._id),
        };
        // dispatch(
        //     updateColumn({
        //         token: auth.token,
        //         sourceColumnData: {
        //             id: column._id,
        //             data,
        //         },
        //         idProject: project.data._id,
        //     })
        // );
        setTitleInput(false);
    }

    return (
        <form
            onSubmit={onSubmit}
            ref={formRef}
            action=""
            className="column__header-form"
        >
            <input type="text" value={value} onChange={onChangeInput} />
        </form>
    );
};

export default TitleInput;
