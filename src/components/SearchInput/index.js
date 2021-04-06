import React, { useState } from "react";
import PropTypes from "prop-types";

import CustomInput from "../Input";

import IconSearch from "images/icon-search.svg";

import "./style.scss";

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState("");

  return (
    <div className="search-input">
      <CustomInput
        className="search-input-text"
        value={value}
        size="sm"
        onChange={setValue}
        onPressEnter={() => onSearch(value)}
      />
      <div className="search-input-icon" onClick={() => onSearch(value)}>
        <img src={IconSearch} alt="search-icon" />
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  onSearch: () => {},
};

export default SearchInput;
