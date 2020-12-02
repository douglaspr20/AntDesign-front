import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Input } from "antd";

import "./style.scss";

class CustomInput extends React.Component {
  render() {
    const { className, multiple, ...rest } = this.props;

    return multiple ? (
      <Input.TextArea
        {...rest}
        rows={4}
        className={clsx("custom-input", className, "mutiple")}
      />
    ) : (
      <Input {...rest} className={clsx("custom-input", className)} />
    );
  }
}

CustomInput.propTypes = {
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

CustomInput.defaultProps = {
  className: "",
  multiple: false,
};

export default CustomInput;
