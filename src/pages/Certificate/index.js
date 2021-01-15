import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import { CustomButton } from "components";
import { setLoading } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";

import LogoSidebar from "images/logo-sidebar.svg";

import "./style.scss";

const CertificatePage = ({ userProfile, setLoading }) => {
  const downloadPdf = async () => {
    setLoading(true);
    const domElement = document.getElementById("certificate-panel");
    const canvas = await html2canvas(domElement);

    const width = domElement.clientWidth;
    const height = domElement.clientHeight;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPdf({
      orientation: "landscape",
      format: [width, height],
      unit: "px",
    });
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("certificate.pdf");
    setLoading(false);
  };

  return (
    <div className="certificate-page">
      <div className="certificate-page-wrapper" id="certificate-panel">
        <div className="certificate">
          <div className="certificate-top">
            <div className="certificate-logo">
              <img src={LogoSidebar} alt="sidebar-logo" />
            </div>
            <h3 className="certificate-title">
              Hacking HR’s Certificate of Participation
            </h3>
            <h1 className="certificate-username">Edgar David</h1>
          </div>
          <div className="certificate-center">
            <h5 className="certificate-text1">
              For Attending The Hacking HR Mumbai Chapter Session:
            </h5>
            <h4 className="certificate-text2">
              Leadership Hacks: Understanding and Leveraging Teams
            </h4>
            <h5 className="certificate-text1">Duration: One Hour</h5>
          </div>
          <div className="certificate-bottom">
            <div className="certificate-bottom-sign">
              <h5 className="certificate-text1 date">December 19, 2020</h5>
              <div className="certificate-divider" />
              <h5 className="certificate-text1">Date</h5>
            </div>
            <div className="certificate-bottom-image">
              <img src={LogoSidebar} alt="certificate-img" />
            </div>
            <div className="certificate-bottom-sign">
              <div className="certificate-signature"></div>
              <div className="certificate-divider" />
              <h5 className="certificate-text1">HHR director signature</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="certificate-page-actions">
        <CustomButton
          id="print-button"
          text="Download PDF"
          type="primary"
          size="lg"
          onClick={downloadPdf}
        />
      </div>
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

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificatePage);
