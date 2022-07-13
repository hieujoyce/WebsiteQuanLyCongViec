import React from "react";
import Model from "../../components/Model";

const CustomMoDel = ({ close, data, onChangeInput, onSubmit }) => {
    return (
        <Model close={close}>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Tên cột"
                        name="title"
                        value={data.title}
                        onChange={onChangeInput}
                        required
                    />
                    <i className="bx bx-columns"></i>
                </div>
                <button>Thêm cột</button>
            </form>
        </Model>
    );
};

export default CustomMoDel;
