import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomModal } from "components";
import Emitter from "services/emitter";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const AttendanceDisclaimerModal = () => {
  const [visible, setVisible] = useState(false);

  Emitter.on(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, (data) => {
    setVisible(true);
  });

  return (
    <CustomModal
      title="Attendance disclaimer"
      subTitle="Must accept to continue"
      visible={visible}
      width={430}
    ></CustomModal>
  );
};

AttendanceDisclaimerModal.propTypes = {
  visible: PropTypes.bool,
};

AttendanceDisclaimerModal.defaultProps = {
  visible: false,
};

export default AttendanceDisclaimerModal;
