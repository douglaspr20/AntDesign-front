import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { CustomButton } from "components";
import AdvertisementDrawer from "containers/AdvertisementDrawer";

import {
  getAdvertisementsByAdvertiser,
  createAdvertisement,
  getAdvertisementsTodayByPage,
  getAllActiveAdvertisements
} from "redux/actions/advertisment-actions";
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
    align: "right",
  },
  {
    title: "Ad Duration By Day",
    dataIndex: "adDurationByDays",
    key: "adDurationByDays",
    align: "right",
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
  createAdvertisement,
  getAllActiveAdvertisements,
  allActiveAdvertisements
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isEmpty(userProfile) && userProfile.id) {
      getAdvertisementsByAdvertiser(userProfile.id);
    }

    getAllActiveAdvertisements()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <div className="advertiser-dashboard-wrapper">
      <div className="advertiser-action">
        <h3>Available Credits: 100 Credits</h3>
        <CustomButton text="Buy more credits" type="primary" />
      </div>
      <div className="advertiser-content">
        <h3>How it works</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="advertiser-content">
        <h3>How much it cost</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="advertiser-action">
        <h3>Campaigns</h3>
        <CustomButton
          text="New campaign"
          type="primary"
          onClick={() => setVisible(true)}
        />
      </div>
      <Table
        dataSource={advertisementsByAdvertiser}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <AdvertisementDrawer
        visible={visible}
        setVisible={setVisible}
        createAdvertisement={createAdvertisement}
        onDashboard={true}
        allActiveAdvertisements={allActiveAdvertisements}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...advertisementSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getAdvertisementsByAdvertiser,
  createAdvertisement,
  getAdvertisementsTodayByPage,
  getAllActiveAdvertisements
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertiser);
