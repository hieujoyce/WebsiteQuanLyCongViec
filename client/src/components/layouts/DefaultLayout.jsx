import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import NavTop from "../NavBar/NavTop";

const DefaultLayout = () => {
    const [nav, setNav] = useState(true);
    return (
        <div
            className="layout"
            style={{
                "--width-nav": `${nav ? "280px" : "0px"}`,
            }}
        >
            <NavBar nav={nav} setNav={setNav} />
            <NavTop />
            {nav === false && (
                <div
                    className="icon-fix"
                    onClick={() => setNav(true)}
                    style={{
                        position: "fixed",
                        cursor: "pointer",
                        top: "200px",
                        left: "10px",
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        boxShadow: "var(--box-shadow-2)",
                        fontSize: "30px",
                        zIndex: "20",
                    }}
                >
                    <i class="bx bx-chevron-right"></i>
                </div>
            )}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
