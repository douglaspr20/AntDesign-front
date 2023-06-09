import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";

const SpeakerCard = ({ speaker }) => {
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
      onClick={() => window.open(`${speaker.linkSpeaker}`, "_blank")}
    >
      {speaker.img ? (
        <Avatar size={150} src={speaker.img} alt={speaker.name} />
      ) : (
        <Avatar size={150} icon={<UserOutlined />} />
      )}

      <div style={{ textAlign: "center" }}>
        <p className="speaker-name">{speaker.name}</p>
        <p>{speaker.description}</p>
      </div>
    </Card>
  );
};

export default SpeakerCard;
