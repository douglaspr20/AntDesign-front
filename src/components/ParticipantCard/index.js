import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SpecialtyItem } from "components";
import "./style.scss";

const ParticipantCard = ({ participant }) => {
  return (
    <Card
      hoverable
      bordered
      type="inner"
      extra={<UserOutlined />}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "200px",
      }}
      style={{ marginTop: "1rem" }}
    >
      {img ? (
        <Avatar size={180} src={participant.img} />
      ) : (
        <Avatar size={180} style={{ fontSize: "2rem" }}>
          {participant.abbrName}
        </Avatar>
      )}

      <div style={{ textAlign: "center" }}>
        <p className="participant-name">
          {participant.firstName} {participant.lastName}
        </p>
        <p className="participant-name">{participant.about}</p>
        <div>
          {participant.topicsOfInterest.map((topic) => (
            <SpecialtyItem title={topic} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ParticipantCard;
