import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { getAdvertisementsByAdvertiser } from "redux/actions/advertisment-actions";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";

import { homeSelector } from "redux/selectors/homeSelector";

import "./styles.scss";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  // {
  //   title: "Ad Banner Size",
  //   dataIndex: "adBannerSize",
  //   key: "adBannerSize",
  // },
  {
    title: "Page",
    dataIndex: "page",
    key: "page",
  },
  {
    title: "Ad Link",
    dataIndex: "advertisementLink",
    key: "advertisementLink",
    ellipsis: true,
    render: (text) => {
      return (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    },
  },
  {
    title: "Ad Content Link",
    dataIndex: "adContentLink",
    key: "adContentLink",
    ellipsis: true,
    render: (text) => {
      return (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    },
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => {
      return moment(text).format("LL");
    },
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => {
      return moment(text).format("LL");
    },
  },
  {
    title: "Ad Cost Per Day",
    dataIndex: "adCostPerDay",
    key: "adCostPerDay",
    align: 'right'
  },
  {
    title: "Ad Duration By Day",
    dataIndex: "adDurationByDays",
    key: "adDurationByDays",
    align: 'right'
  },
  {
    title: "Ad Preview Link",
    dataIndex: "adPreviewLink",
    key: "adPreviewLink",
    ellipsis: true,
    render: (_, record) => {
      const url = `${process.env.REACT_APP_DOMAIN_URL}/ad/${record.page}/preview/${record.id}`;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      );
    },
  },
];

const Advertiser = ({
  getAdvertisementsByAdvertiser,
  advertisementsByAdvertiser,
  userProfile,
}) => {
  useEffect(() => {
    if (!isEmpty(userProfile) && userProfile.id) {
      getAdvertisementsByAdvertiser(userProfile.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <div className="advertiser-dashboard-wrapper">
      <div>Available Credits: 100 Credits</div>
      <Table
        dataSource={advertisementsByAdvertiser}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  advertisementsByAdvertiser:
    advertisementSelector(state).advertisementsByAdvertiser,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getAdvertisementsByAdvertiser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertiser);
