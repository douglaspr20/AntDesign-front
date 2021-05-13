import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { Row, Col } from "antd";
import { CustomSelect } from "components";

import {
  getAllCourses,
} from "redux/actions/course-actions";

import { courseSelector } from "redux/selectors/courseSelector";

import ClassCard from './ClassCard';
import ClassesFilterPanel from "./ClassesFilterPanel";
import { SETTINGS } from "enum";

import './style.scss';

const SortOptions = SETTINGS.SORT_OPTIONS;

const Classes = ({
  getAllCourses,
  allCourses,
}) => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line
  }, []);

  const onFilterChange = (filter) => {
    console.log('Filter Change', filter);
  }

  const onSortChange = (value) => {
    setSortValue(value);
  };

  return (
    <div className="classes-page">
      <ClassesFilterPanel onChange={onFilterChange} />
      <div className="classes-page__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3 className="filters-btn">
                  Filters
                </h3>
                <h3>{allCourses.length} result{allCourses.length > 1 ? 's' : ''}</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>{allCourses.length} result{allCourses.length > 1 ? 's' : ''}</h3>
                <CustomSelect
                  className="search-results-container-sort"
                  bordered={false}
                  options={SortOptions}
                  value={sortValue}
                  onChange={(value) => onSortChange(value)}
                />
              </div>
            </Col>
          </Row>
          <div className="classes-list">
            {allCourses.map(classItem => (
              <ClassCard
                key={classItem.id}
                id={classItem.id}
                title={classItem.title}
                description={classItem.description}
                image={classItem.image != null ? classItem.image : "https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg" }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  allCourses: courseSelector(state).allCourses,
});

const mapDispatchToProps = {
  getAllCourses,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes);
