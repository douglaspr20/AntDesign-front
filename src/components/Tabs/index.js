import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import clsx from "clsx";

import "./style.scss";

const { TabPane } = Tabs;

const TabData = [
  {
    title: "Upcoming events",
    content: () => <div>Content 1</div>,
  },
  {
    title: "My events",
    content: () => <div>Content 2</div>,
  },
];

const CustomTabs = ({ className, data, ...rest }) => {
  return (
    <Tabs
      {...rest}
      className={clsx("custom-tabs", className)}
      defaultActiveKey="0"
    >
      {data.map((tab, index) => (
        <TabPane
          className="custom-tabs-tabpane"
          tab={tab.title}
          key={index.toString()}
        >
          {tab.content()}
        </TabPane>
      ))}
    </Tabs>
  );
};

CustomTabs.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
};

CustomTabs.defaultProps = {
  className: "",
  data: TabData,
};

export default CustomTabs;
