import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Select } from "antd";

import "./style.scss";

class CustomSelect extends React.Component {
  render() {
    const { options, className, ...rest } = this.props;

    return (
      <Select
        {...rest}
        className={clsx("custom-select", className)}
        suffixIcon={<i className="fal fa-angle-down" />}
        dropdownClassName="custom-select-dropdown"
      >
        {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value}>
            {opt.text}
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
