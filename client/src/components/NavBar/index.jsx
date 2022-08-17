import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

const NavBar = () => {
    const p = useLocation();

    return (
        <div className="nav">
            <div className="top">
                <div className="logo">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png"
                        alt="logo"
                    />
                </div>
                <div className="info">
                    <h3>Quản lý dự án</h3>
                    <p>WorkSpace</p>
                </div>
                <div className="icon">
                    <i className="bx bx-expand-vertical"></i>
                </div>
            </div>
            <div className="mid">
                <Link
                    to={"/activate"}
                    className={`item ${
                        p.pathname === "/activate" ? "active" : ""
                    }`}
                >
                    <i className="bx bx-run"></i>
                    <p>Hoạt động</p>
                </Link>
                <div className="item">
                    <i className="bx bx-check-circle"></i>
                    <p>Công việc của tôi</p>
                    <div className="number">35</div>
                </div>
                <div className="line"></div>
                <Link
                    to={"/"}
                    className={`item ${p.pathname === "/" ? "active" : ""}`}
                >
                    <i className="bx bx-home"></i>
                    <p>Tổng quan</p>
                </Link>
                <Link
                    to={"/board"}
                    className={`item ${
                        p.pathname.startsWith("/board") ? "active" : ""
                    }`}
                >
                    <i className="bx bx-grid-alt"></i>
                    <p>Dự án</p>
                </Link>
                <div className="item">
                    <i className="bx bx-calendar-minus"></i>
                    <p>Lịch trình</p>
                </div>
                <div className="item">
                    <i className="bx bx-group"></i>
                    <p>Nhóm</p>
                </div>
                <div className="item">
                    <i className="bx bx-line-chart"></i>
                    <p>Phân tích</p>
                </div>
            </div>

            <div className="bot">
                <div className="item">
                    <i className="bx bx-help-circle"></i>
                    <p>Giúp đỡ</p>
                </div>
                <div className="item">
                    <i className="bx bx-cog"></i>
                    <p>Cài đặt</p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
