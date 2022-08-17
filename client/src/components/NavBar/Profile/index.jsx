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
                <LinkModel avatar={auth.user.avatar} close={closeLinkModel} />
            )}
            <div className="profile">
                <h2>Profile</h2>
                <div className="profile__avatar">
                    <div className="profile__avatar-img">
                        <img src={auth.user.avatar} alt="" />
                    </div>
                    <div className="profile__avatar-btn">
                        <button
                            className="btn change"
                            onClick={() => setLinkModel(true)}
                        >
                            Thay đổi link avatar
                        </button>
                        <button className="btn bg-pink delete">
                            Xóa link avatar
                        </button>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="username">Tên tài khoản:</label>
                    <input
                        type="text"
                        name="username"
                        id=""
                        readOnly
                        value={auth.user.username}
                    />
                </div>
            </div>
        </Model>
    );
};

const LinkModel = ({ close, avatar }) => {
    const [avatarValue, setAvatarValue] = useState(avatar);
    const { auth } = useSelector((state) => state);
    function onChangeInput(e) {
        const value = e.target.value;
        setAvatarValue(value);
    }
    const dispatch = useDispatch();
    function handleChangeLinkAvatar() {
        if (avatarValue === avatar) return;
        dispatch(
            updateProfile({
                data: {
                    avatar: avatarValue,
                },
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
                        name="username"
                        id=""
                        value={avatarValue}
                        onChange={onChangeInput}
                    />
                    <i className="bx bx-photo-album"></i>
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
