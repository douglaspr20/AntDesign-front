import React, { useState } from "react";
import { connect } from "react-redux";
import { Popconfirm, Comment, Avatar, Form } from "antd";
import moment from "moment-timezone";
import { EditOutlined } from "@ant-design/icons";
import { CustomInput, CustomButton } from "components";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import { ReactComponent as IconTrashOutline } from "images/icon-trash-outline.svg";
import { actions as councilConversationReplyActions } from "redux/actions/council-conversation-reply-actions";

import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const CouncilConversationCommentReply = ({
  userProfile,
  data,
  upsertCouncilConversationReply,
  deleteCouncilConversationReply
}) => {
  const [isEditResponse, setIsEditResponse] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const parsed = qs.parse(location.search);

  const handleDeleteResponse = () => {
    deleteCouncilConversationReply(data.id, parsed.id)
  };

  const handleOnFinish = (values) => {
    upsertCouncilConversationReply({
      ...values,
      id: data.id,
      CouncilConversationCommentId: data.CouncilConversationCommentId,
      CouncilConversationId: parsed.id,
    });

    form.resetFields();
    setIsEditResponse((state) => !state);
  };

  const displayContentResponse = isEditResponse ? (
    <Form
      form={form}
      initialValues={{ comment: data.comment }}
      onFinish={handleOnFinish}
    >
      <Form.Item name="comment">
        <CustomInput multiple required />
      </Form.Item>
      <CustomButton size="sm" text="Edit" htmlType="submit" />
    </Form>
  ) : (
    data.comment
  );

  return (
    <div className="council-conversation-replies-container">
      <Comment
        author={`${data.User.firstName} ${data.User.lastName}`}
        avatar={
          <Avatar
            src={data.User.img}
            alt={`${data.User.firstName} ${data?.SkillCohortParticipant?.User?.lastName}`}
          />
        }
        datetime={<span>{moment(data.createdAt).fromNow()}</span>}
        content={displayContentResponse}
        actions={[
          userProfile.id === data.User.id && (
            <span
              key="comment-basic-reply-to"
              onClick={() => setIsEditResponse((value) => !value)}
            >
              <EditOutlined /> Edit
            </span>
          ),
          userProfile.id === data.User.id && (
            <Popconfirm
              title="Are you sure you want to permanently remove this item?"
              onConfirm={handleDeleteResponse}
            >
              <IconTrashOutline /> Remove
            </Popconfirm>
          ),
        ]}
      ></Comment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...councilConversationReplyActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouncilConversationCommentReply);
