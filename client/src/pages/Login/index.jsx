import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginThunk from "../../redux/thunk/login";

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { auth } = useSelector((state) => state);

    const dispatch = useDispatch();

    function handleChangeInput(e) {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginThunk(login));
    }

    useEffect(() => {
        if (auth?.user) {
            navigate("/");
        }
    }, [auth?.user, navigate]);

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png"
                        alt="logo"
                    />
                </div>
                <h2 className="name">Quản lý dự án</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Email"
                        value={login.email}
                        name="email"
                        onChange={handleChangeInput}
                        required
                    />
                    <i className="bx bxs-envelope"></i>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        value={login.password}
                        onChange={handleChangeInput}
                        autoComplete="on"
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <button>Đăng nhập</button>
                <a href="/">Quên mật khẩu</a>
                <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link to={"/register"}>Đăng kí tại đây</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
