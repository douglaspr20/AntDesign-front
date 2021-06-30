import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomModal, CustomCheckbox, CustomButton } from "components";

import "./style.scss";

const PodcastClaimModal = ({ onClaim, ...rest }) => {
  const [checked, setChecked] = useState(false);

  return (
    <CustomModal width={500} maskClosable={false} {...rest}>
      <div className="podcast-claim-modal">
        <h5>HR Credit Offered.</h5>
        <CustomCheckbox
          size="sm"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Confirm here
        </CustomCheckbox>
        <div className="podcast-claim-modal-footer">
          <CustomButton
            disabled={!checked}
            text="Claim"
            size="md"
            onClick={onClaim}
          />
        </div>
      </div>
    </CustomModal>
  );
};

PodcastClaimModal.propTypes = {
  onClaim: PropTypes.func,
};

PodcastClaimModal.defaultProps = {
  onClaim: () => {},
};

export default PodcastClaimModal;
