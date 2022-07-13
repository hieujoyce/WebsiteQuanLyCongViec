import React from "react";
import Model from "../../../components/Model";

const CustomTitleModel = ({ close, data, onChangeInput, onSubmit }) => {
    return (
        <Model close={close}>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Tên nhiệm vụ"
                        name="title"
                        value={data.title}
                        onChange={onChangeInput}
                        required
                    />
                    <i className="bx bx-copy-alt"></i>
                </div>
                <button>Cập nhật</button>
            </form>
        </Model>
    );
};

export default CustomTitleModel;
