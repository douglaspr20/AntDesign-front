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
        {options.map((opt) => {
          if (opt.name) {
            return (
              <Select.Option
                key={opt.name}
                value={`${opt.name}/${opt.timezoneId}`}
              >
                {opt.name}, {opt.country}
              </Select.Option>
            );
          } else {
            return (
              <Select.Option key={opt.key || opt.value} value={opt.value}>
                {opt.text}
              </Select.Option>
            );
          }
        })}
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
