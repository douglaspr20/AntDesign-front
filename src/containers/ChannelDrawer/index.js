import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { CustomDrawer, ChannelForm } from "components";

const ChannelDrawer = ({ visible, onClose }) => {
  const onCreateChannel = (values) => {
    console.log("**** vlaues ", values);
    onClose();
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
};

ChannelDrawer.defaultProps = {
  visible: false,
  onClose: () => {},
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDrawer);
