import React, { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import {
  CustomButton,
  CustomDrawer,
  ProfileAvatar,
  SpecialtyItem,
} from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

const MemberDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [member, setMember] = useStateWithCallbackLazy({});
  const [match, setMatch] = useState([]);

  Emitter.on(EVENT_TYPES.OPEN_MEMBER_PANEL, ({ member, match }) => {
    setVisible(true);
    setMember(member);
    setMatch(match);
  });

  const onDrawerClose = () => {
    setVisible(false);
  };

  const onClickMatch = () => {
    setMember(
      (prev) => ({ ...prev, connected: true }),
      (current) => {
        Emitter.emit(EVENT_TYPES.MEMBER_CHANGED, current);
      }
    );
  };

  return (
    <CustomDrawer
      title={"Mentor profile"}
      width={772}
      visible={visible}
      onClose={onDrawerClose}
    >
      <div className="member-details">
        <div className="member-details-header">
          <ProfileAvatar
            className="user-info-avatar"
            user={member}
            color="#438cef"
            percent={member.percentOfCompletion}
          />
          <h1 className="user-info-name">{`${member.firstName} ${member.lastName}`}</h1>
          <CustomButton
            className="profile-complete-btn"
            text={member.connected ? "Connected" : "Match"}
            type="primary"
            size="lg"
            disabled={member.connected}
            onClick={(event) => !member.connected && onClickMatch(event)}
          />
        </div>
        <div className="member-details-content">
          <h5 className="member-details-content-label">
            {`Why do you I to be a ${member.type}?`}
          </h5>
          <p className="member-details-content-text">{member.reason || ""}</p>
          <h5 className="member-details-content-label">Title / Profession</h5>
          <p className="member-details-content-text">
            {member.titleProfessions || ""}
          </p>
          <h5 className="member-details-content-label">My specialties</h5>
          <div className="member-details-content-specialties">
            {(member.topicsOfInterest || [])
              .sort((x, y) => {
                const first = (match || []).includes(x);
                const second = (match || []).includes(y);

                return !first && second ? 1 : first && second ? 0 : -1;
              })
              .map((spec, index) => (
                <SpecialtyItem
                  key={`specialty-${index}`}
                  title={spec}
                  active={(match || []).includes(spec)}
                />
              ))}
          </div>
          <h5 className="member-details-content-label">Main language</h5>
          <p className="member-details-content-text">{member.language || ""}</p>
          <h5 className="member-details-content-label">Time zone</h5>
          <p className="member-details-content-text">{member.timezone || ""}</p>
        </div>
      </div>
    </CustomDrawer>
  );
};

export default MemberDrawer;
