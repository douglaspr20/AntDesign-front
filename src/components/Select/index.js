import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Select } from "antd";

import "./style.scss";

class CustomSelect extends React.Component {
  render() {
    const { options, className, bordered, mode, ...rest } = this.props;

    return (
      <Select
        {...rest}
        mode={mode ? mode : ""}
        className={clsx("custom-select", className, { border: bordered })}
        suffixIcon={<i className="fal fa-angle-down" />}
        dropdownClassName="custom-select-dropdown"
      >
        {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value}>
            {opt.text || opt.label || opt.title}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
};

CustomSelect.defaultProps = {
  className: "",
  options: [],
};

export default CustomSelect;
