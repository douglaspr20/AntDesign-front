import React from "react";
import { Table } from "antd";
import moment from "moment-timezone";

import "./styles.scss";

const dataSource = [
  {
    id: 1,
    adBannerSize: "Ad Banner Size 1",
    startDate: moment().format("LL"),
    endDate: moment().format("LL"),
    preview: 'Link here'
  },
  {
    id: 2,
    adBannerSize: "Ad Banner Size 2",
    startDate: moment().format("LL"),
    endDate: moment().format("LL"),
    preview: 'Link here'
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Ad Banner Size",
    dataIndex: "adBannerSize",
    key: "adBannerSize",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Preview",
    dataIndex: "preview",
    key: "preview",
  },
];

const Advertiser = () => {
  return (
    <div className="advertiser-dashboard-wrapper">
      <div>Available Credits: 100 Credits</div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Advertiser;
