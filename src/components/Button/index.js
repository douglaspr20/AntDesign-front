import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import "./style.scss";

class CustomButton extends React.Component {
  render() {
    const { type, text, size, className, ...rest } = this.props;
    const newClassName = `custom-button ${type} ${size} ${className}`;

    return (
      <Button {...rest} className={newClassName}>
        {text}
      </Button>
    );
  }
}

CustomButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

CustomButton.defaultProps = {
  text: "",
  type: "primary",
  size: "lg",
  className: "",
};

export default CustomButton;
