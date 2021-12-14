import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { CustomButton } from "components";

import "./style.scss";

const ParticipantCard = ({
  participant,
  onOpenModalBonfires,
  invitedAllBonfires,
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
    >
      {!invitedAllBonfires && (
        <CustomButton
          size="sm"
          text="Invite to bonfire"
          style={{ marginTop: "-30px", marginBottom: "30px" }}
          onClick={() => onOpenModalBonfires(participant.id)}
        />
      )}

      <a
        href={participant.personalLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="link-container"
      >
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
          <p style={{ marginTop: -10 }}>{participant.titleProfessions}</p>
          <p style={{ marginTop: -10 }}>{participant.company}</p>
        </div>
      </a>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(ParticipantCard);
