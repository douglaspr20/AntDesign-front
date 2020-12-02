import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./style.scss";

const CustomRadio = ({ type, className, size, children, ...params }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={clsx("custom-radio", type, size, className, {
        checked: checked,
      })}
      onClick={() => setChecked(!checked)}
      {...params}
    >
      <div className="custom-radio-inner">
        <i className="fas fa-check" />
      </div>
      <span className="custom-radio-text">{children}</span>
    </div>
  );
};

CustomRadio.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

CustomRadio.defaultProps = {
  type: "primary",
  size: "md",
  className: "",
  onChange: () => {},
};

export default CustomRadio;
