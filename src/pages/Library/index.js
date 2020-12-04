import React from "react";
import PropTypes from "prop-types";

import FilterPanel from "./FilterPanel";

import "./style.scss";

class LearningLibraryPage extends React.Component {
  render() {
    return (
      <div className="learning-library-page">
        <FilterPanel />
        <div className="search-results-container"></div>
      </div>
    );
  }
}

LearningLibraryPage.propTypes = {
  title: PropTypes.string,
};

LearningLibraryPage.defaultProps = {
  title: "",
};

export default LearningLibraryPage;
