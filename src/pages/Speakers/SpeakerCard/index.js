import React from "react";
import { Card, Col, Image } from "antd";
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
        <Image
          width={150}
          height={150}
          src={speaker.image}
          alt={speaker.name}
          style={{ borderRadius: "100%" }}
          preview={false}
        />
        <div style={{ textAlign: "center" }}>
          <p className="speaker-name">{speaker.name}</p>
          <p>{speaker.job}</p>
          <p>{speaker.enterprise}</p>
        </div>
      </Card>
    </Col>
  );
};

export default SpeakerCard;
