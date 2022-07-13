import React from "react";
import "./nav-top.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavTop = () => {
    function logout() {
        localStorage.removeItem("logger");
        window.location.href = "/login";
    }

    const auth = useSelector((state) => state.auth);

    return (
        <div className="nav-top">
            <div className="search">
                <div className="back icon">
                    <i className="bx bx-left-arrow-alt"></i>
                </div>
                <div className="input">
                    <input type="text" placeholder="Tìm kiếm" />
                    <i className="bx bx-search"></i>
                </div>
            </div>
            <div className="right">
                <div className="notifi icon dropdown">
                    <i className="bx bx-bell"></i>
                    <div className="number">16</div>
                </div>
                <div className="info dropdown">
                    <div className="avatar">
                        <img src={auth.user.avatar} alt="" />
                    </div>
                    <p className="name">{auth.user.username}</p>
                    <i className="bx bx-chevron-down"></i>
                    <div className="dropdown__content">
                        <Link to={"/profile"} className="item">
                            <i className="bx bx-user-circle"></i>
                            <p>Profile</p>
                        </Link>
                        <div className="line">
                            <div></div>
                        </div>
                        <div className="item" onClick={logout}>
                            <i className="bx bx-log-out"></i>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavTop;
