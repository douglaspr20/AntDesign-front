import React from "react";
import PropTypes from "prop-types";

import IconDocument from "images/icon-document.svg";

import "./style.scss";

class ArticleCard extends React.Component {
  render() {
    const {
      data: { img, title, desc },
      className,
    } = this.props;
    const newClassName = `article-card ${className || ""}`;

    return (
      <div className={newClassName}>
        <div className="article-card-img">
          {img && <img src={img} alt="article-card-img" />}
        </div>
        <div className="article-card-content d-flex flex-column justify-between items-start">
          <h3>{title}</h3>
          <h5>{desc}</h5>
          <div className="article-card-content-file">
            <div className="doc-image">
              <img src={IconDocument} alt="doc-icon" />
            </div>
            <h6>{`Article`}</h6>
          </div>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

ArticleCard.defaultProps = {
  data: {},
  className: "",
};

export default ArticleCard;
