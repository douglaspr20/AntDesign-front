import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Input } from "antd";

import "./style.scss";

class CustomInput extends React.Component {
  render() {
    const { className, multiple, onChange, ...rest } = this.props;

    return multiple ? (
      <Input.TextArea
        {...rest}
        rows={4}
        className={clsx("custom-input", className, "mutiple")}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Input
        {...rest}
        className={clsx("custom-input", className)}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
}

CustomInput.propTypes = {
  className: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  className: "",
  multiple: false,
  onChange: () => {},
};

export default CustomInput;
