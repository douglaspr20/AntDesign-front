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
      <Avatar size={180} icon={<UserOutlined />} />

      <div style={{ textAlign: "center" }}>
        <p className="participant-name">Douglas Perez</p>
        <div>
          <SpecialtyItem title="agility" />
          <SpecialtyItem title="Culture" />
          <SpecialtyItem title="Design Thinking" />
        </div>
      </div>
    </Card>
  );
};

export default ParticipantCard;
