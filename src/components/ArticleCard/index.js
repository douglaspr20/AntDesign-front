import React from "react";
import PropTypes from "prop-types";

import IconDocument from "images/icon-document.svg";

import "./style.scss";

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineClamp: 3,
      randomId: `article-description-${Math.floor(Math.random() * 1000)}`,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.getRowNum();
    }, 500);
    window.addEventListener("resize", () => {
      this.getRowNum();
    });
  }

  getRowNum = () => {
    const descElement = document.querySelector(`#${this.state.randomId}`);
    if (descElement) {
      const maxRow = Math.floor(descElement.offsetHeight / 23);
      this.setState({ lineClamp: maxRow ? maxRow : 1 });
    }
  };

  render() {
    const {
      data: { img, title, desc },
      className,
    } = this.props;
    const { randomId, lineClamp } = this.state;
    const newClassName = `article-card ${className || ""}`;

    return (
      <div className={newClassName}>
        <div className="article-card-img">
          {img && <img src={img} alt="article-card-img" />}
        </div>
        <div className="article-card-content">
          <h3>{title}</h3>
          <div id={randomId} className="d-flex items-center">
            <p
              style={{
                WebkitLineClamp: lineClamp,
                maxHeight: 23 * lineClamp,
              }}
            >
              {desc}
            </p>
          </div>
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
