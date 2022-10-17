import React, { useState } from "react";
import "./Login/style.scss";
import { Link, Navigate } from "react-router-dom";
import registerThunk from "../redux/thunk/register";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const [register, setRegister] = useState({
        email: "",
        username: "",
        password: "",
        confirmPw: "",
    });
    const [errForm, setErrForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPw: "",
    });

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    const validateEmail = (email) => {
        return email.match(
            //eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function checkValidate(register) {
        const err = { email: "", username: "", password: "", confirmPw: "" };
        if (register.email.length === 0) {
            err.email = "Email không được để trống";
        } else if (!validateEmail(register.email)) {
            err.email = "Email chưa đúng định dạng";
        }

        if (register.username.length === 0) {
            err.username = "Tên tài khoản không được để trống";
        } else if (register.username.length > 12) {
            err.username = "Tên tài khoản không được dài quá 12 kí tự";
        } else if (register.username.length < 6) {
            err.username = "Tên tài khoản không được ngắn hơn 6 kí tự";
        }

        if (register.password.length === 0) {
            err.password = "Mật khẩu không được để trống";
        } else if (register.password.length > 25) {
            err.password = "Mật khẩu không được dài quá 25 kí tự";
        } else if (register.password.length < 6) {
            err.password = "Mật khẩu không được ngắn hơn 6 kí tự";
        } else if (register.password !== register.confirmPw) {
            err.confirmPw = "Xác nhận mật khẩu không chính xác";
        }

        return err;
    }

    function handleChangeInput(e) {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const err = checkValidate(register);
        if (err.email || err.username || err.password || err.confirmPw) {
            setErrForm({
                email: err.email,
                username: err.username,
                password: err.password,
                confirmPw: err.confirmPw,
            });
        } else {
            dispatch(registerThunk(register));
        }
    }

    if (auth?.user) {
        return <Navigate to="/" />;
    }

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
                <div className={`input-group ${errForm.email ? "err" : ""}`}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={register.email}
                        onChange={handleChangeInput}
                    />
                    <i className="bx bxs-envelope"></i>
                </div>
                {errForm.email && (
                    <div className="input-group__label">
                        <i class="bx bx-error-alt"></i>
                        <p>{errForm.email}</p>
                    </div>
                )}
                <div className={`input-group ${errForm.username ? "err" : ""}`}>
                    <input
                        type="text"
                        placeholder="Tài Khoản"
                        name="username"
                        value={register.username}
                        onChange={handleChangeInput}
                    />
                    <i className="bx bxs-user"></i>
                </div>
                {errForm.username && (
                    <div className="input-group__label">
                        <i class="bx bx-error-alt"></i>
                        <p>{errForm.username}</p>
                    </div>
                )}
                <div className={`input-group ${errForm.password ? "err" : ""}`}>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        autoComplete="on"
                        value={register.password}
                        onChange={handleChangeInput}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                {errForm.password && (
                    <div className="input-group__label">
                        <i class="bx bx-error-alt"></i>
                        <p>{errForm.password}</p>
                    </div>
                )}
                <div
                    className={`input-group ${errForm.confirmPw ? "err" : ""}`}
                >
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        name="confirmPw"
                        autoComplete="on"
                        value={register.confirmPw}
                        onChange={handleChangeInput}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                {errForm.confirmPw && (
                    <div className="input-group__label">
                        <i class="bx bx-error-alt"></i>
                        <p>{errForm.confirmPw}</p>
                    </div>
                )}
                <button>Đăng kí</button>
                <p>
                    Bạn đã có tài khoản?{" "}
                    <Link to={"/login"}>Đăng nhập tại đây</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
