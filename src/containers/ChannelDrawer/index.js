import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notification } from "antd";

import { CustomDrawer, ChannelForm } from "components";
import { createChannel } from "redux/actions/channel-actions";

const ChannelDrawer = ({ visible, onClose, createChannel, onCreated }) => {
  const onCreateChannel = (values) => {
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
  };

  return (
    <CustomDrawer title="Create Channel" visible={visible} onClose={onClose}>
      <ChannelForm onSubmit={onCreateChannel} onCancel={onClose} />
    </CustomDrawer>
  );
};

ChannelDrawer.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onCreated: PropTypes.func,
};

ChannelDrawer.defaultProps = {
  visible: false,
  onClose: () => {},
  onCreated: () => {},
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
  createChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDrawer);
