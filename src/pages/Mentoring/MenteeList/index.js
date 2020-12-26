import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";

import { CustomButton, MemberCard } from "components";
import { numberWithCommas } from "utils/format";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";
import { setSettingCollapsed } from "redux/actions/home-actions";

import "./style.scss";

const MenteeList = ({ user, setting, setSettingCollapsed }) => {
  const entry = {
    firstName: "Andryi",
    lastName: "Shevchenko",
    abbrName: "AS",
    img: null,
    about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
    titleProfessions: "HR Management & Coaching",
    proficiencyLevel: "",
    topicsOfInterest: [
      "Leadership",
      "Recruiting",
      "Human Resources",
      "Technologies",
    ],
    personalLinks: {},
    language: "English EN - United States",
    timezone: "(GMT -12:00) Eniwetok, Kwajalein",
    completed: false,
    percentOfCompletion: 75,
    role: "mentee",
    reason:
      "HHRR leader, community cultivator, speaker, mentor, & advisor. Founder at @CraftAndRigor. Curator of HHRSeattle.org. Formerly HHRR leadership FB & AWS",
    connected: false,
  };
  const Data = Array.from(Array(10).keys()).map((item) => ({
    id: item,
    ...entry,
  }));
  const collapsed = setting.collapsed.mentor;

  const [menteeList, setMenteeList] = useState(Data);
  const [total] = useState(234);
  const [match] = useState(8);

  const onShowMore = () => {
    setMenteeList((prev) =>
      [...prev, ...Data].map((item, index) => ({
        ...item,
        id: index,
      }))
    );
  };

  const onMemberCardClick = (member) => {
    Emitter.emit(EVENT_TYPES.OPEN_MEMBER_PANEL, {
      member,
      match: (user || {}).specialties || [],
    });
  };

  const onMatchClicked = (index) => {
    if (!menteeList[index].connected) {
      setMenteeList((prev) => {
        prev[index].connected = true;
        return [...prev];
      });
    }
  };

  Emitter.on(EVENT_TYPES.MEMBER_CHANGED, (member) => {
    setMenteeList((prev) => {
      prev[member.id] = member;
      return [...prev];
    });
  });

  const onCollapseClick = () => {
    setSettingCollapsed({ mentor: !collapsed });
  };

  return (
    <div className="mentee-list">
      <div className="mentee-list-collapse" onClick={onCollapseClick}>
        <i
          className={clsx(
            "fas",
            { "fa-chevron-down": collapsed },
            { "fa-chevron-up": !collapsed }
          )}
        />
      </div>
      <div className="mentee-list-header">
        <div className="mentee-list-header-left">
          <span>{`${numberWithCommas(total)}`}</span>
          <span>{` ${total === 1 ? "mentee" : "mentees"} match with you`}</span>
        </div>
        <span className="mentee-list-header-right">
          {`You have ${numberWithCommas(match)} match left this month`}
        </span>
      </div>
      <div className="mentee-list-items">
        {(menteeList || []).map((mentee, index) => (
          <MemberCard
            key={`mentor-${index}`}
            user={mentee}
            match={user ? user.specialties : []}
            onClick={() => onMemberCardClick(mentee)}
            onMatchClicked={() => onMatchClicked(index)}
          />
        ))}
        <div className="mentee-list-items-more">
          <CustomButton
            text="Show more"
            type="primary outlined"
            size="lg"
            onClick={onShowMore}
          />
        </div>
      </div>
    </div>
  );
};

MenteeList.propTypes = {
  user: PropTypes.object,
};

MenteeList.defaultProps = {
  user: {},
};

const mapStateToProps = (state, props) => {
  return {
    setting: state.home.setting,
  };
};

const mapDispatchToProps = {
  setSettingCollapsed,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenteeList);
