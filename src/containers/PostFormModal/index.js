import React from "react";
import { CloseCircleFilled } from "@ant-design/icons";

import { CustomModal } from "components";
import PostForm from "containers/PostForm";

const PostFormModal = ({ userProfile, visible, onCancel, ...rest }) => {
  return (
    <CustomModal
      title={"CREATE POST"}
      width={1000}
      visible={visible}
      bodyStyle={{ overflowY: "scroll", maxHeight: "calc(100vh - 200px)" }}
      onCancel={onCancel}
      closable={true}
      footer={[]}
      closeIcon={<CloseCircleFilled className="payment-modal-close" />}
    >
      <PostForm></PostForm>
    </CustomModal>
  );
};

export default PostFormModal;
