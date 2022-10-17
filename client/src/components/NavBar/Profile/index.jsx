import React, { useState } from "react";
import Model from "../../Model";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import updateProfile from "../../../redux/thunk/user";

const Profile = ({ close }) => {
    const { auth } = useSelector((state) => state);
    const [linkModel, setLinkModel] = useState(false);
    function closeLinkModel() {
        setLinkModel(false);
    }

    return (
        <Model close={close}>
            {linkModel && (
                <LinkModel
                    avatar={auth.user.avatar}
                    close={closeLinkModel}
                    username={auth.user.username}
                />
            )}
            <div className="profile">
                <h2>Thông tin cá nhân</h2>
                <div className="profile__avatar">
                    <div className="profile__avatar-img">
                        <img src={auth.user.avatar} alt="" />
                    </div>
                    <div
                        className="profile__avatar-btn"
                        onClick={() => setLinkModel(true)}
                    >
                        <i className="bx bxs-edit-alt"></i>
                    </div>
                </div>
                <div className="profile__item">
                    <i className="bx bxs-envelope"></i>
                    <p>{auth.user.email}</p>
                </div>
                <div className="profile__item">
                    <i className="bx bxs-user"></i>
                    <p>{auth.user.username}</p>
                </div>
            </div>
        </Model>
    );
};

const LinkModel = ({ close, avatar, username }) => {
    const [avatarValue, setAvatarValue] = useState(avatar);
    const [usernameValue, setUsernameValue] = useState(username);
    const { auth } = useSelector((state) => state);
    function onChangeInput(e) {
        const value = e.target.value;
        setAvatarValue(value);
    }

    function onChangeInputUsername(e) {
        const value = e.target.value;
        setUsernameValue(value);
    }
    const dispatch = useDispatch();
    function handleChangeLinkAvatar() {
        if (avatarValue === avatar && usernameValue === username) return;
        let data;
        if (avatarValue === avatar) {
            data = {
                username: usernameValue,
            };
        } else {
            data = {
                avatar: avatarValue,
            };
        }
        dispatch(
            updateProfile({
                data,
                token: auth.token,
                id: auth.user._id,
            })
        );
        close();
    }

    return (
        <Model close={close}>
            <div className="linkModel">
                <h3>Link ảnh</h3>
                <div className="input-group">
                    <input
                        type="text"
                        name="avatar"
                        id=""
                        value={avatarValue}
                        onChange={onChangeInput}
                    />
                    <i className="bx bx-photo-album"></i>
                </div>
                <h3>Username</h3>
                <div className="input-group">
                    <input
                        type="text"
                        name="username"
                        id=""
                        value={usernameValue}
                        onChange={onChangeInputUsername}
                    />
                    <i className="bx bxs-user"></i>
                </div>
                <div className="btns row">
                    <div className="col-6">
                        <button className="btn bg-pink" onClick={close}>
                            Hủy bỏ
                        </button>
                    </div>
                    <div className="col-6">
                        <button
                            className="btn"
                            onClick={handleChangeLinkAvatar}
                        >
                            Thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </Model>
    );
};

export default Profile;
