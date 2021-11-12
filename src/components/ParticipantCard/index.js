import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import "./style.scss";

const ParticipantCard = ({ participant, userProfile }) => {
  return (
    <a
      href={participant.personalLinks.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      style={{ maxWidth: "250px", marginBottom: "1rem" }}
    >
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
        style={{ marginTop: "1rem" }}
      >
        {participant.img ? (
          <Avatar size={180} src={participant.img} />
        ) : (
          <Avatar size={180} style={{ fontSize: "2rem" }}>
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
      </Card>
    </a>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(ParticipantCard);
