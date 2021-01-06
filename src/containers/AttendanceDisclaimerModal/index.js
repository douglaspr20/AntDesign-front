import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";

import { CustomModal, CustomButton } from "components";
import { envSelector } from "redux/selectors/envSelector";
import Emitter from "services/emitter";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const Text = `
  Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur dignissim massa nec libero scelerisque rutrum. Curabitur ac purus id elit hendrerit lacinia. Nullam sit amet sem efficitur, porta diam in, convallis tortor.
`;

const AttendanceDisclaimerModal = ({ isMobile }) => {
  const [visible, setVisible] = useState(false);

  Emitter.on(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, (data) => {
    setVisible(true);
  });

  const onConfirm = () => {
    setVisible(false);
    Emitter.emit(EVENT_TYPES.VISIT_CERTIFICATE_PAGE, 1);
  };

  return (
    <CustomModal
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

export default connect(mapStateToProps)(AttendanceDisclaimerModal);
