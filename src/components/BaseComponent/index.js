import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

class BaseComponent extends React.Component {
  render() {
    return (
      <div className="base-component">
        {this.props.title}
      </div>
    );
  }
}

BaseComponent.propTypes = {
  title: PropTypes.string,
};

BaseComponent.defaultProps = {
  title: "",
};

export default BaseComponent;
