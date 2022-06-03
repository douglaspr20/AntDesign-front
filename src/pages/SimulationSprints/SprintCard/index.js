import React from "react";
import moment from "moment-timezone";
import { CustomButton } from "components";

import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const description = {
  html: `<p>Test sprints card</p>`,
};

const SprintCard = () => {
  return (
    <div className="sprint-card">
      <div className="sprint-card-header">
        <img src={HARDCODED_COVER_PLACEHOLDER} alt="header" />
      </div>
      <div className="sprint-card-content">
        <h3 className="sprint-card-title">Test Sprints</h3>
        <div id={10} className="d-flex">
          <div
            className="sprint-card-desc"
            dangerouslySetInnerHTML={{
              __html: (description || {}).html || "",
            }}
          />
        </div>
        <h5 className="sprint-card-hr">Starting on {moment().format("LL")}</h5>
        <h5 className="sprint-card-hr">Finishing on {moment().format("LL")}</h5>
        <div className="sprint-card-join-btn">
          <CustomButton
            text="More"
            onClick={() => {}}
            type="primary"
            size="md"
            block={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
