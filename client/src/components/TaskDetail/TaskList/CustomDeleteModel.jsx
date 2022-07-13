import React from "react";
import Model from "../../../components/Model";

const CustomDeleteModel = ({ close, onClickDelete }) => {
    return (
        <Model close={close}>
            <div className="model-delete">
                <h3>Bạn có chắc chắn muốn xóa công việc này?</h3>
                <div className="model-delete__btns row">
                    <div className="col-6">
                        <button onClick={onClickDelete} className="btn bg-pink">
                            Xóa
                        </button>
                    </div>
                    <div className="col-6">
                        <button onClick={close} className="btn">
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </div>
        </Model>
    );
};

export default CustomDeleteModel;
