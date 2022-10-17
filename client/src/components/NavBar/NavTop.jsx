import { useState } from "react";
import "./nav-top.scss";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const NavTop = () => {
    const navigate = useNavigate();
    const [profileModel, setProfileModel] = useState(false);
    function close() {
        setProfileModel(false);
    }
    function logout() {
        localStorage.removeItem("logger");
        window.location.href = "/login";
    }

    const auth = useSelector((state) => state.auth);

    return (
        <div className="nav-top">
            {profileModel && <Profile close={close} />}
            <div className="search">
                <div className="back icon" onClick={() => navigate(-1)}>
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
                    {/* <div className="number">16</div> */}
                </div>
                <div className="info dropdown">
                    <div className="avatar">
                        <img src={auth.user.avatar} alt="" />
                    </div>
                    <p className="name">{auth.user.username}</p>
                    <i className="bx bx-chevron-down"></i>
                    <div className="dropdown__content">
                        <div
                            className="item"
                            onClick={() => setProfileModel(true)}
                        >
                            <i className="bx bx-user-circle"></i>
                            <p>Thông tin cá nhân</p>
                        </div>
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
