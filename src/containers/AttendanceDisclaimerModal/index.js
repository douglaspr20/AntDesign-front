import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";

import { CustomModal, CustomButton } from "components";
import { envSelector } from "redux/selectors/envSelector";
import { updateEventStatus } from "redux/actions/event-actions";
import Emitter from "services/emitter";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const Text = `
  By clicking on "Yes, I Confirm", you are certifying that you actually participated in the event.
`;

const AttendanceDisclaimerModal = ({ isMobile, updateEventStatus }) => {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});

  Emitter.on(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, (data) => {
    setVisible(true);
    setEvent(data);
  });

  const onConfirm = () => {
    setVisible(false);
    updateEventStatus(event, "confirmed");
  };

  return (
    <CustomModal
      wrapClassName="attendance-confirm-modal-wrap"
      title="Attendance disclaimer"
      subTitle="Must accept to continue"
      visible={visible}
      width={430}
      onCancel={() => setVisible(false)}
    >
      <div className={clsx("attendance-disclaimer", { mobile: isMobile })}>
        <p className="attendance-disclaimer-content">{Text}</p>
        <div className="attendance-disclaimer-footer">
          <CustomButton
            text="Yes, I confirm"
            type="primary"
            size="md"
            onClick={onConfirm}
          />
        </div>
      </div>
    </CustomModal>
  );
};

AttendanceDisclaimerModal.propTypes = {
  visible: PropTypes.bool,
};

AttendanceDisclaimerModal.defaultProps = {
  visible: false,
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

const mapDispatchToProps = {
  updateEventStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceDisclaimerModal);
