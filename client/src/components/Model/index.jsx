import React, { useEffect, useRef } from "react";
import "./style.scss";

const Model = ({ close, children }) => {
    const modelRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                close();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [close]);

    return (
        <div className="model-container">
            <div ref={modelRef} className="model">
                <div className="model__header">
                    <div className="model__header-close">
                        <i className="bx bx-x-circle" onClick={close}></i>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Model;
