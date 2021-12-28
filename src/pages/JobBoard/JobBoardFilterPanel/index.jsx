import React, { useState } from "react";

import "./style.scss";

const JobBoardFilterPanel = ({
  title = "Filters",
  allCategories,
  onChange,
}) => {
  const [filters, setFilters] = useState({});
  const onFilterChange = (field, values) => {
    let newFilter = {
      ...filters,
      [field]: JSON.stringify(values),
    };
    setFilters(newFilter);
    onChange(newFilter);
  };

  return (
    <div className="job-board-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="job-board-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Categories</h5>

        </div>
      </div>
    </div>
  );
};


export default JobBoardFilterPanel
