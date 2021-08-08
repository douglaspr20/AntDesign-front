import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import RenderPropsTruncatedString from "components/RenderPropsTruncatedString.js";

import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

function ClassCard({ id, title, description, image }) {
  return (
    <Link className="class-card" to={`${INTERNAL_LINKS.MICRO_CLASS}/${id}`}>
      <div className="class-card-header">
        {image && <img src={image} alt={title || "cover image"} />}
      </div>
      <div className="class-card-content">
        <h3 className="class-card-title">{title}</h3>
        <div className="d-flex items-center">
          <p className="class-card-desc">
            <RenderPropsTruncatedString text={description} threshold={250}>
              {({ truncatedText }) => <>{truncatedText}</>}
            </RenderPropsTruncatedString>
          </p>
        </div>
        <div className="class-card-content-footer">
          <div className="d-flex items-center"></div>
          <div className="d-flex items-center"></div>
        </div>
      </div>
    </Link>
  );
}

ClassCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

ClassCard.defaultProps = {
  title: "",
  description: "",
  image: HARDCODED_COVER_PLACEHOLDER,
};

export default ClassCard;
