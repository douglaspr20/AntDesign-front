import React from "react";
import PropTypes from "prop-types";

import { CustomDrawer } from "components";

import EventAddEditForm from "./EventAddEditForm";

const EventAddEditDrawer = ({ visible, onAdded, onClose }) => {
  return (
    <CustomDrawer title="Add Events" visible={visible} onClose={onClose}>
      <EventAddEditForm onAdded={onAdded} onCancel={onClose} />
    </CustomDrawer>
  );
};

EventAddEditDrawer.propTypes = {
  visible: PropTypes.bool,
  onAdded: PropTypes.func,
  onClose: PropTypes.func,
};

EventAddEditDrawer.defaultProps = {
  visible: false,
  onAdded: () => {},
  onClose: () => {},
};

export default EventAddEditDrawer;
