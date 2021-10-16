import React from "react";
import { Card, Col, Image, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";

const SpeakerCard = ({ speaker }) => {
  return (
    <Col className="speaker-col">
      <Card
        hoverable
        bordered
        type="inner"
        extra={<UserOutlined />}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {speaker.img ? (
          <Image
            width={200}
            height={180}
            src={speaker.image}
            alt={speaker.name}
            style={{ borderRadius: "100%" }}
            preview={false}
          />
        ) : (
          <Avatar size={180} icon={<UserOutlined />} />
        )}

        <div style={{ textAlign: "center" }}>
          <p className="speaker-name">{speaker.name}</p>
          <p>{speaker.description}</p>
        </div>
      </Card>
    </Col>
  );
};

export default SpeakerCard;
