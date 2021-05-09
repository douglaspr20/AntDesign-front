import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { CustomSelect, AnnualConferenceCard } from "components";
import { CONFERENCE_SETTING } from "enum";

import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const SessionType = [
  {
    text: "All Sessions",
    value: "all",
  },
  ...CONFERENCE_SETTING.SESSION_TYPE,
];

const ConferenceData = [
  {
    title: "Leading organizations in the remote world of work",
    type: "Keynote",
    startTime: moment(),
    endTime: moment(),
    timezone: "Pacific Daylight Time",
    description:
      "Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.",
    speakers: [
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
    ],
    brands: [
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
    ],
  },
  {
    title: "Leading organizations in the remote world of work",
    type: "Keynote",
    startTime: moment(),
    endTime: moment(),
    timezone: "Pacific Daylight Time",
    description:
      "Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.",
    speakers: [
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
    ],
    brands: [
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
    ],
  },
  {
    title: "Leading organizations in the remote world of work",
    type: "Keynote",
    startTime: moment(),
    endTime: moment(),
    timezone: "Pacific Daylight Time",
    description:
      "Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.",
    speakers: [
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
      {
        image:
          "https://lab-user-images.s3.us-east-2.amazonaws.com/profile/1610331531465.jpeg",
        name: "Roberto Carlos da Silva",
        title: "HHRR manager at Adobe",
      },
    ],
    brands: [
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
      "https://lab-user-images.s3.us-east-2.amazonaws.com/marketplace/1619816316750.jpeg",
    ],
  },
  {
    title: "Leading organizations in the remote world of work",
    type: "Keynote",
    startTime: moment(),
    endTime: moment(),
    timezone: "Pacific Daylight Time",
    description:
      "Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.",
    speakers: [],
  },
];

const ConferenceList = ({ data, allCategories }) => {
  const [sortTheme, setSortTheme] = useState("main");
  const [sortCategory, setSortCategory] = useState("all");
  const [sortSessionType, setSortSessionType] = useState("all");
  const [categoryOptions, setCategoryOptions] = useState([
    {
      text: "All Categories",
      value: "all",
    },
  ]);

  useEffect(() => {
    setCategoryOptions([
      {
        text: "All Categories",
        value: "all",
      },
      ...allCategories.map((category) => ({
        text: category.title,
        value: category.value,
      })),
    ]);
  }, [allCategories]);

  return (
    <div className="conference-list">
      <div className="conference-list-header">
        <h3>{`${data.length} talk${data.length === 1 ? "" : "s"}`}</h3>
        <div className="conference-list-header-select">
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={[{ value: "main", text: "Main theme" }]}
            value={sortTheme}
            onChange={setSortTheme}
          />
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={categoryOptions}
            value={sortCategory}
            onChange={setSortCategory}
          />
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={SessionType}
            value={sortSessionType}
            onChange={setSortSessionType}
          />
        </div>
      </div>
      <div className="conference-list-container">
        {ConferenceData.map((session, index) => (
          <AnnualConferenceCard key={index} session={session} />
        ))}
      </div>
    </div>
  );
};

ConferenceList.propTypes = {
  data: PropTypes.array,
};

ConferenceList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(ConferenceList);
