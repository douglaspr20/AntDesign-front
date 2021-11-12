import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { SpecialtyItem } from "components";
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
          <p className="participant-name">
            {participant.firstName} {participant.lastName}
          </p>
          <p className="participant-name">{participant.titleProfessions}</p>
          <p className="participant-name">{participant.company}</p>

          <div className="category-container">
            {participant.topicsOfInterest.map((topic, i) => {
              if (userProfile.topicsOfInterest.includes(topic)) {
                return <SpecialtyItem title={topic} key={i} />;
              }

              return null;
            })}
          </div>
        </div>
      </Card>
    </a>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(ParticipantCard);
