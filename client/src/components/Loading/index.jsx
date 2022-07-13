import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Loading = () => {
    const alert = useSelector((state) => state.alert);
    return (
        <>
            {alert?.loading && (
                <div className="loading">
                    <svg>
                        <circle cx={70} cy={70} r={70}></circle>
                    </svg>
                </div>
            )}
        </>
    );
};

export default Loading;
