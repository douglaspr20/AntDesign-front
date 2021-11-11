import React from "react";
import { Checkbox } from "antd";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./style.scss";

const CustomCheckbox = ({
  type,
  className,
  children,
  onChange,
  size,
  ...params
}) => (
  <Checkbox
    className={clsx("custom-checkbox", type, className, size)}
    {...params}
    onChange={(e) => onChange(e.target.checked)}
  >
    {children}
  </Checkbox>
);

CustomCheckbox.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

CustomCheckbox.defaultProps = {
  type: "primary",
  size: "md",
  className: "",
  onChange: () => {},
};

export default CustomCheckbox;
