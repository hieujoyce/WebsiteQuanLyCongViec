import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import NavTop from "../NavBar/NavTop";

const DefaultLayout = () => {
    return (
        <div className="layout">
            <NavBar />
            <NavTop />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
