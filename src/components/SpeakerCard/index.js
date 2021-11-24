import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";

const SpeakerCard = ({ speaker }) => {
  return (
    <a
      href={speaker.linkSpeaker}
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
      >
        {speaker.img ? (
          <Avatar size={180} src={speaker.img} alt={speaker.name} />
        ) : (
          <Avatar size={180} icon={<UserOutlined />} />
        )}

        <div style={{ textAlign: "center" }}>
          <p className="speaker-name">{speaker.name}</p>
          <p>{speaker.description}</p>
        </div>
      </Card>
    </a>
  );
};

export default SpeakerCard;
