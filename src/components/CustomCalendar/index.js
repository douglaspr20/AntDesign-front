import React, { useState } from "react";
import PropTypes from "prop-types";
import { Calendar } from "antd";
import moment from "moment";

import { SVG_ICONS } from "enum";
import { CustomButton } from "components";

import IconLeft from "images/icon-arrow-left.svg";
import IconRight from "images/icon-arrow-right.svg";

import "./style.scss";

const CustomCalendar = ({ title }) => {
  const [current, setCurrent] = useState(moment());
  const onDateChange = (date) => {
    setCurrent(date);
  };

  const getEventData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
      case 12:
      case 16:
      case 23:
      case 30:
        listData = [{ type: "success", content: "" }];
        break;
      default:
        listData = [];
    }
    return listData;
  };

  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const current = value.clone();
    const localeData = value.localeData();
    const currentMonth = `${localeData.months(current)} ${current.year()}`;

    const onPrevMonth = () => {
      const newDate = current.subtract(1, "month");
      onChange(newDate);
    };

    const onNextMonth = () => {
      const newDate = current.add(1, "month");
      onChange(newDate);
    };

    return (
      <div className="custom-calendar-header">
        <span className="custom-calendar-header-date">{currentMonth}</span>
        <div className="custom-calendar-header-buttons">
          <img src={IconLeft} alt="arrow-left" onClick={onPrevMonth} />
          <img src={IconRight} alt="arrow-left" onClick={onNextMonth} />
        </div>
      </div>
    );
  };

  const dateCellRender = (date) => {
    const listData = getEventData(date);

    return listData && listData.length > 0 ? SVG_ICONS.ICON_CIRCLE : null;
  };

  const onSelectToday = () => {
    setCurrent(moment());
  };

  return (
    <div className="custom-calendar">
      <Calendar
        className="custom-calendar-control"
        value={current}
        fullscreen={false}
        headerRender={headerRender}
        dateCellRender={dateCellRender}
        onChange={onDateChange}
      />
      <CustomButton
        className="custom-calendar-today"
        text="Today"
        type="primary outlined"
        size="xs"
        onClick={onSelectToday}
      />
    </div>
  );
};

CustomCalendar.propTypes = {
  title: PropTypes.string,
};

CustomCalendar.defaultProps = {
  title: "",
};

export default CustomCalendar;
