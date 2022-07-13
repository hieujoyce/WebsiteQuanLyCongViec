import React from "react";
import Model from "../../../components/Model";

const CustomAddMoDel = ({ close, data, onChangeInput, onSubmit, txtBtn }) => {
    return (
        <Model close={close}>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Tên công việc"
                        name="title"
                        value={data.title}
                        onChange={onChangeInput}
                        required
                    />
                    <i className="bx bx-buildings"></i>
                </div>
                <button>{txtBtn}</button>
            </form>
        </Model>
    );
};

export default CustomAddMoDel;
