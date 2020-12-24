import React from "react";
import PropTypes from "prop-types";

import { CustomButton, SpecialtyItem } from "components";

import "./style.scss";

const MemberCard = ({ user }) => {
  const onClick = () => {};

  const onClickMatch = () => {};

  const randomId = Math.floor(Math.random() * 1000) + 1;

  return (
    <div className="member-card" onClick={onClick}>
      <div className="member-card-left">
        <div className="member-avatar">
          {user.img ? (
            <div className="member-avatar-img">
              <img src={user.img} alt="user-img" />
            </div>
          ) : (
            <span className="member-avatar-name">{user.abbrName}</span>
          )}
        </div>
      </div>
      <div className="member-card-right">
        <div className="member-card-right-header">
          <h3 className="member-name">{`${user.firstName} ${user.lastName}`}</h3>
          <CustomButton
            text="Match"
            size="sm"
            type="primary"
            onClick={onClickMatch}
          />
        </div>
        <h5 className="member-title">{user.titleProfessions}</h5>
        <p className="member-about">{user.about}</p>
        <div className="member-specialties">
          {(user.topicsOfInterest || []).map((spec, index) => (
            <SpecialtyItem
              key={`specialty-${randomId}-${index}`}
              title={spec}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  user: PropTypes.object,
};

MemberCard.defaultProps = {
  user: "",
};

export default MemberCard;
