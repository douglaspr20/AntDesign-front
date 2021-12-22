import React from "react";
import { Card, Avatar, Tooltip } from "antd";
import {
  LinkedinOutlined,
  MailOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { CustomButton } from "components";

import "./style.scss";

const ParticipantCardInfo = ({ participant, marketplaceProfile }) => (
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
      <p style={{ marginTop: -10 }}>
        {participant.titleProfessions || participant.lookingFor}
      </p>
      <p style={{ marginTop: -10 }}>{participant.company}</p>
    </div>
    {marketplaceProfile && (
      <div className="participant-card-marketplaceprofile">
        {participant.resumeUrl !== "" && participant.resumeUrl && (
          <Tooltip title="Download Resume">
            <a
              href={participant.resumeUrl}
              download={`${participant.firstName} ${participant.lastName}`}
              className="participant-card-marketplaceprofile-icon"
            >
              <ProfileOutlined />
            </a>
          </Tooltip>
        )}

        <Tooltip title="Linkedin">
          <a
            href={participant.personalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="participant-card-marketplaceprofile-icon"
          >
            <LinkedinOutlined />
          </a>
        </Tooltip>

        <Tooltip title="Contact Email">
          <a
            href={`mailto:${participant.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="participant-card-marketplaceprofile-icon"
          >
            <MailOutlined />
          </a>
        </Tooltip>
      </div>
    )}
  </>
);

const ParticipantCard = ({
  participant,
  onOpenModalBonfires,
  invitedAllBonfires,
  marketplaceProfile,
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
          <ParticipantCardInfo participant={participant} marketplaceProfile />
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
