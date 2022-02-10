import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import moment from "moment";
import converter from "number-to-words";

import { setLoading } from "redux/actions/home-actions";
import { getEvent } from "redux/actions/event-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { eventSelector } from "redux/selectors/eventSelector";
import { HelmetMetaData } from "components";
import { INTERNAL_LINKS } from "enum";

import ImgCertificateStamp from "images/img-certificate-stamp.png";
import ImgHHRLogo from "images/img-certificate-logo.png";
import ImgSignature from "images/img-signature.png";
import IconBack from "images/icon-back.svg";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { DownloadOutlined } from "@ant-design/icons";

import "./style.scss";

const EventCertificatePage = ({ user, myEvents, getEvent, setLoading }) => {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const shareUrl = `${window.location.origin}${
    INTERNAL_LINKS.EVENT_CERTIFICATE
  }?id=${query.get("id")}`;

  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  const downloadPdf = async () => {
    setLoading(true);
    const domElement = document.getElementById("certificate-panel");
    const canvas = await html2canvas(domElement, { scale: 4 });

    const width = domElement.clientWidth;
    const height = domElement.clientHeight;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPdf({
      orientation: "landscape",
      format: [2000, (2000 / width) * height],
      unit: "px",
      hotfixes: ["px_scaling"],
      precision: 32,
    });

    pdf.addImage(
      imgData,
      "jpeg",
      0,
      0,
      2000,
      (2000 / width) * height,
      "",
      "SLOW"
    );
    pdf.save("certificate.pdf");
    setLoading(false);
  };

  const getPerodOfEvent = (startDate, endDate) => {
    const duration = moment.duration(moment(endDate).diff(moment(startDate)));

    return duration.asHours();
  };

  const period = getPerodOfEvent(myEvents.startDate, myEvents.endDate);
  return (
    <>
      <HelmetMetaData
        title={myEvents.title}
        metatitle={myEvents.title}
        image={ImgSignature}
        description={"description"}
        metadescription={"description"}
      ></HelmetMetaData>
      <div className="certificate-page">
        <div
          className="certificate-page-header-content-back-btn"
          onClick={() => history.push(INTERNAL_LINKS.MY_LEARNINGS)}
        >
          <div className="certificate-page-header-content-back">
            <div className="certificate-page-header-content-back-img">
              <img src={IconBack} alt="icon-back" />
            </div>
            <h4>Back to List</h4>
          </div>
        </div>
        <div className="certificate-page-wrapper" id="certificate-panel">
          <div className="certificate">
            <div className="certificate-top">
              <div className="certificate-logo">
                <img src={ImgHHRLogo} alt="sidebar-logo" />
              </div>
              <h3 className="certificate-title">
                Hacking HR's Certificate of Participation
              </h3>
              <h1 className="certificate-username">{`${user.firstName} ${user.lastName}`}</h1>
            </div>
            <div className="certificate-center">
              <h5 className="certificate-text1 organizer">
                {`For Attending ${myEvents.organizer} Session:`}
              </h5>
              <h4 className="certificate-text2">{myEvents.title}</h4>
              <h5 className="certificate-text1 duration">{`Duration: ${converter.toWords(
                period
              )} Hour${period > 1 ? "s" : ""}`}</h5>
            </div>
            <div className="certificate-bottom">
              <div className="certificate-bottom-sign">
                <h5 className="certificate-text1 date">{`${moment(
                  new Date()
                ).format("MMMM DD, YYYY")}`}</h5>
                <div className="certificate-divider" />
                <h5 className="certificate-text1">Date</h5>
              </div>
              <div className="certificate-bottom-image">
                <img src={ImgCertificateStamp} alt="certificate-img" />
              </div>
              <div className="certificate-bottom-sign">
                <div className="certificate-signature">
                  <img src={ImgSignature} alt="certificate-signature" />
                </div>
                <div className="certificate-divider" />
                <h5 className="certificate-text1 signature">
                  Founder at Hacking HR
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="certificate-participation">
          <div className="certificate-participation-logo">
            <img
              src={ImgHHRLogo}
              alt="sidebar-logo"
              className="certificate-participation-image"
            />
          </div>
          <div>
            <h2>Hacking HR's Certificate of Participation</h2>
            <span>Issued by Hacking HR's</span>
          </div>
        </div>
        <div className="share-certificate">
          <h3>Share your badge</h3>
          <div className="certificate-page-actions">
            <FacebookShareButton url={shareUrl} quote="comentario default">
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title="comentario vergas titulo diosl"
              summary="description sirve?"
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title="title default">
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <button onClick={downloadPdf} className="custom-download-button">
              <DownloadOutlined />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

EventCertificatePage.propTypes = {
  title: PropTypes.string,
};

EventCertificatePage.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  user: homeSelector(state).userProfile,
  myEvents: eventSelector(state).myEvents,
});

const mapDispatchToProps = {
  setLoading,
  getEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCertificatePage);
