import React, { useState } from "react";
import "./Login/style.scss";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerThunk from "../redux/thunk/register";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const [register, setRegister] = useState({
        username: "",
        password: "",
        confirmPw: "",
    });

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    function checkValidate(register) {
        const err = [];
        if (register.username.length > 25) {
            err.push("Tên tài khoản không được dài quá 25 kí tự");
        } else if (register.username.length < 6) {
            err.push("Tên tài khoản không được ngắn hơn 6 kí tự");
        }

        if (register.password.length > 25) {
            err.push("Mật khẩu không được dài quá 25 kí tự");
        } else if (register.password.length < 6) {
            err.push("Mật khẩu khoản không được ngắn hơn 6 kí tự");
        } else if (register.password !== register.confirmPw) {
            err.push("Xác nhận mật khẩu không chính xác");
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
        if (err.length > 0) {
            toast.error(<ErrMsg err={err} />);
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
                <h2 className="name">Website quản lý dự án</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Tài Khoản"
                        name="username"
                        value={register.username}
                        onChange={handleChangeInput}
                        required
                    />
                    <i className="bx bxs-user"></i>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        autoComplete="on"
                        value={register.password}
                        onChange={handleChangeInput}
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        name="confirmPw"
                        autoComplete="on"
                        value={register.confirmPw}
                        onChange={handleChangeInput}
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <button>Đăng kí</button>
                <p>
                    Bạn đã có tài khoản?{" "}
                    <Link to={"/login"}>Đăng nhập tại đây</Link>
                </p>
            </form>
        </div>
    );
};

const ErrMsg = ({ err }) => {
    return (
        <div>
            {err.map((e, i) => (
                <p
                    key={i}
                    style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "5px",
                    }}
                >
                    {e}
                </p>
            ))}
        </div>
    );
};

export default Register;
