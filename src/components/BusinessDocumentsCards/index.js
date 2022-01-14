import React from "react";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import { SpecialtyItem } from "components";
import { ProfileOutlined } from "@ant-design/icons";
import { homeSelector } from "redux/selectors/homeSelector";
import moment from "moment-timezone";
import "./style.scss";

const BusinessDocumentsCard = ({ documentFile }) => {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.setAttribute("href", documentFile.documentFileUrl);
    link.setAttribute(
      "download",
      `${documentFile.User.firstName} ${documentFile.User.lastName}`
    );
    link.setAttribute("target", "_blank");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="business-card-container">
      <Card
        hoverable
        bordered
        type="inner"
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h3 style={{ marginBottom: 10 }}>{documentFile.title}</h3>
        <p>
          <strong>Description:</strong> {documentFile.description}
        </p>
        <div>
          <p style={{ display: "flex", gap: 5 }}>
            <strong>Categories:</strong>
            {documentFile.categories.map((el, index) => (
              <SpecialtyItem title={el} key={index} />
            ))}
          </p>
        </div>
        <p>
          <strong>Posted By:</strong> {documentFile.User.firstName}{" "}
          {documentFile.User.lastName}
        </p>
        <div className="business-download" onClick={() => downloadFile()}>
          <Button
            shape="circle"
            type="link"
            icon={<ProfileOutlined />}
            // disabled={userProfile.memberShip !== "premium"}
            className="participant-card-marketplaceprofile-icon"
          />
          <p style={{ display: "contents" }}>Download</p>
        </div>
        <div className="card-date">
          <p>{moment(documentFile?.createdAt).format("YYYY-MM-DD")}</p>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessDocumentsCard);
