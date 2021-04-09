import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notification } from "antd";

import { CustomDrawer, ChannelForm } from "components";
import { createChannel, updateChannel } from "redux/actions/channel-actions";

const ChannelDrawer = ({
  visible,
  edit,
  onClose,
  createChannel,
  updateChannel,
  onCreated,
}) => {
  const onCreateChannel = (values) => {
    if (edit) {
      updateChannel(values, (error) => {
        if (error) {
          notification.error({
            message: "Error",
            description: error,
          });
        } else {
          onCreated();
        }
      });
    } else {
      createChannel(values, (msg) => {
        if (msg) {
          notification.error({
            message: "Error",
            description: msg,
          });
        } else {
          onCreated();
        }
      });
    }
  };

  return (
    <CustomDrawer
      title={`${edit ? "Edit" : "Create"} Channel`}
      visible={visible}
      onClose={onClose}
    >
      <ChannelForm edit={edit} onSubmit={onCreateChannel} onCancel={onClose} />
    </CustomDrawer>
  );
};

ChannelDrawer.propTypes = {
  visible: PropTypes.bool,
  edit: PropTypes.bool,
  onClose: PropTypes.func,
  onCreated: PropTypes.func,
};

ChannelDrawer.defaultProps = {
  visible: false,
  edit: false,
  onClose: () => {},
  onCreated: () => {},
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
  createChannel,
  updateChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDrawer);
