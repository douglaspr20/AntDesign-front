import React from "react";
import { Card, Avatar, Tooltip, Button } from "antd";
import {
  LinkedinOutlined,
  MailOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { CustomButton, SpecialtyItem } from "components";

import "./style.scss";

const ParticipantCardInfo = ({
  participant,
  userProfile,
  marketplaceProfile,
}) => {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.setAttribute("href", participant.resumeUrl);
    link.setAttribute(
      "download",
      `${participant.firstName} ${participant.lastName}`
    );
    link.setAttribute("target", "_blank");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {participant.img ? (
        <Avatar size={150} src={participant.img} />
      ) : (
        <Avatar size={150} style={{ fontSize: "2rem" }}>
          {participant.abbrName}
        </Avatar>
      )}

      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: 500 }}>
          {participant.firstName} {participant.lastName}
        </p>
        {participant.lookingFor ? (
          <div style={{ marginTop: -10 }}>
            <span className="participant-card-marketplaceprofile--title">
              Looking For:
            </span>
            {participant.lookingFor.map((profesion, i) => (
              <SpecialtyItem key={i} title={profesion} />
            ))}
          </div>
        ) : (
          <p style={{ marginTop: -10 }}>{participant.titleProfessions}</p>
        )}
        <p style={{ marginTop: -10 }}>{participant.company}</p>

        {participant.location && marketplaceProfile && (
          <div style={{ marginBottom: "50px" }}>
            <span className="participant-card-marketplaceprofile--title">
              Available locations:
            </span>

            {participant.location.map((location, i) => (
              <SpecialtyItem key={i} title={location} />
            ))}
          </div>
        )}
      </div>
      {marketplaceProfile && (
        <div className="participant-card-marketplaceprofile">
          {participant.resumeUrl !== "" && participant.resumeUrl && (
            <Tooltip title="Download Resume">
              <Button
                shape="circle"
                type="link"
                icon={<ProfileOutlined />}
                onClick={() => downloadFile()}
                disabled={userProfile.memberShip !== "premium"}
                className="participant-card-marketplaceprofile-icon"
              />
            </Tooltip>
          )}

          <Tooltip title="Linkedin">
            <Button
              shape="circle"
              type="link"
              icon={<LinkedinOutlined />}
              onClick={() =>
                window.open(participant.personalLinks.linkedin, "_blank")
              }
              className="participant-card-marketplaceprofile-icon"
              disabled={userProfile.memberShip !== "premium"}
            />
          </Tooltip>

          <Tooltip title="Contact Email">
            <Button
              shape="circle"
              type="link"
              icon={<MailOutlined />}
              onClick={() =>
                window.open(`mailto:${participant.email}`, "_blank")
              }
              className="participant-card-marketplaceprofile-icon"
              disabled={userProfile.memberShip !== "premium"}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

const ParticipantCard = ({
  participant,
  onOpenModalBonfires,
  invitedAllBonfires,
  marketplaceProfile,
  userProfile,
}) => {
  return (
    <Card
      hoverable
      bordered
      type="inner"
      extra={<UserOutlined />}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      className="participant-card-container"
    >
      {invitedAllBonfires === false && invitedAllBonfires !== null ? (
        <CustomButton
          size="sm"
          text="Invite to bonfire"
          style={{ marginTop: "-30px", marginBottom: "30px" }}
          onClick={() => onOpenModalBonfires(participant.id)}
        />
      ) : null}

      {marketplaceProfile ? (
        <>
          <ParticipantCardInfo
            participant={participant}
            marketplaceProfile
            userProfile={userProfile}
          />
        </>
      ) : (
        <a
          href={participant.personalLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-container"
        >
          <ParticipantCardInfo participant={participant} />
        </a>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(ParticipantCard);
