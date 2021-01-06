import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import { CustomButton } from "components";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const Data = {
  title: "HHR Latin America Conference",
  event: {
    date: "November 18 2020",
    location: "Online event - 5 hours",
  },
  content: [
    "Participated in the HHR Latin America 2019 conferernce",
    "From October 31 to November 2, 2019",
    "Medellin - Colombia",
  ],
};

const CertificatePage = ({ userProfile }) => {
  const downloadPdf = () => {};

  return (
    <div className="certificate-page">
      <Row gutter={16}>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 12, offset: 6 }}
        >
          <Row gutter={64}>
            <Col lg={{ span: 20, offset: 2 }}>
              <h2 className="certificate-page-title">{Data.title}</h2>
              <h3 className="certificate-page-date">{Data.event.date}</h3>
              <h3 className="certificate-page-location">
                {Data.event.location}
              </h3>
            </Col>
            <Col span={24}>
              <h2 className="certificate-page-title">We certify that</h2>
            </Col>
            <Col span={24}>
              <h1 className="certificate-page-name">{`${
                userProfile.firstName || ""
              } ${userProfile.lastName || ""}`}</h1>
            </Col>
            <Col span={24}>
              {Data.content.map((data, index) => (
                <p key={index} className="certificate-page-text">
                  {data}
                </p>
              ))}
            </Col>
            <Col span={24}>
              <div className="certificate-page-actions">
                <CustomButton
                  text="Download PDF"
                  type="primary"
                  size="lg"
                  onClick={downloadPdf}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

CertificatePage.propTypes = {
  title: PropTypes.string,
};

CertificatePage.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(CertificatePage);
