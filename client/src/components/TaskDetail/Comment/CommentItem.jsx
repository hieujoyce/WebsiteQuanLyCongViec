import React from "react";

const CommentItem = ({ comment }) => {
    return (
        <div className="comment__item">
            <div className="comment__item-header">
                <div className="comment__item-header__avatar">
                    <img src={comment.user.avatar} alt="" />
                    <div className="comment__item-header__avatar-active"></div>
                </div>
                <h3 className="comment__item-header__name">
                    {comment.user.username}
                </h3>
                <div className="comment__item-header__icon">
                    <i className="bx bx-dots-horizontal-rounded"></i>
                </div>
            </div>
            <div className="comment__item-content">{comment.content}</div>
            <div className="comment__item-footer">
                <div className="comment__item-footer__icon">
                    <i className="bx bx-smile"></i>
                </div>
                <div className="comment__item-footer__reply">Phản hồi</div>
                <div className="comment__item-footer__time">6 giờ trước</div>
            </div>
        </div>
    );
};

export default CommentItem;
