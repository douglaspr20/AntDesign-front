import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./style.scss";

const CustomRadio = ({
  type,
  className,
  size,
  checked,
  children,
  ...params
}) => (
  <div
    className={clsx("custom-radio", type, size, className, {
      checked: checked,
    })}
    {...params}
  >
    <div className="custom-radio-inner">
      <i className="fas fa-check" />
    </div>
    <span className="custom-radio-text">{children}</span>
  </div>
);

CustomRadio.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

CustomRadio.defaultProps = {
  type: "primary",
  size: "md",
  checked: false,
  className: "",
};

export default CustomRadio;
