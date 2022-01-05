import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment, Avatar, Popconfirm } from "antd";

import { getPublicationTime } from "utils/format";

import { deleteCouncilComment } from "redux/actions/council-comments-actions";
import { authSelector } from "redux/selectors/authSelector";

import { ReactComponent as IconTrashOutline } from "images/icon-trash-outline.svg";

import "./style.scss";

const CouncilComment = ({
  userId,
  data,
  deleteCouncilComment
}) => {

  const onRemoveComment = () => {
    deleteCouncilComment({ id: data.id, CouncilId: data.CouncilId });
  };

  return (
    <Comment
      author={`${data.userFirstName} ${data.userLastName}`}
      avatar={
        <Avatar
          src={data.userImg}
          alt={`${data.userFirstName} ${data.userLastName}`}
        />
      }
      datetime={<span>{getPublicationTime(data.createdAt)}</span>}
      content={data.comment}
      actions={[
        // enableReply && (
        //   <span key="comment-basic-reply-to" onClick={onReplyClick}>
        //     <IconChatBubblesOutline /> Reply
        //   </span>
        // ),
        userId === data.UserId && (
          <>
          <Popconfirm
            title="Are you sure you want to permanently remove this item?"
            onConfirm={onRemoveComment}
          >
            <IconTrashOutline /> Remove
          </Popconfirm>
          </>
        ),
      ]}
    >
    </Comment>
  );
};

CouncilComment.propTypes = {
  enableReply: PropTypes.bool,
  data: PropTypes.object,
  afterSave: PropTypes.func,
};

CouncilComment.defaultProps = {
  enableReply: true,
  data: null,
  afterSave: () => {},
};

const mapStateToProps = (state) => ({
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  deleteCouncilComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilComment);
