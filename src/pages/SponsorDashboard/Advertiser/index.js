import React, { useEffect, useState } from "react";
import { Space, Tooltip, Table } from "antd";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { CustomButton } from "components";
import { EditOutlined } from "@ant-design/icons";

import AdvertisementDrawer from "containers/AdvertisementDrawer";
import MatchmakingDrawer from "containers/MatchmakingDrawer";

import {
  getAdvertisementsByAdvertiser,
  getAdvertisementsTodayByPage,
  getAllActiveAdvertisements,
} from "redux/actions/advertisment-actions";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";

import { homeSelector } from "redux/selectors/homeSelector";

import "./styles.scss";

const Advertiser = ({
  getAdvertisementsByAdvertiser,
  advertisementsByAdvertiser,
  userProfile,
  createAdvertisement,
  getAllActiveAdvertisements,
}) => {
  const [visible, setVisible] = useState(false);
  const [matchmakingVisible, setMatchmakingVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [advertisement, setAdvertisement] = useState({});

  const handleEdit = (id) => {
    setIsEdit(true);

    const _advertisement = advertisementsByAdvertiser.find(
      (ad) => ad.id === id
    );

    setAdvertisement(_advertisement);
    setVisible(true);
  };

  const clearEditAndAdvertisement = () => {
    setIsEdit(false);
    setAdvertisement({});
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
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
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 150,
      align: "center",
      render: (_, data) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Edit">
            <CustomButton
              style={{ marginRight: "0.5rem", padding: "0 8px" }}
              type="primary outlined"
              size="xs"
              icon={<EditOutlined />}
              onClick={() => handleEdit(data.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!isEmpty(userProfile) && userProfile.id) {
      getAdvertisementsByAdvertiser(userProfile.id);
    }

    getAllActiveAdvertisements();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <div className="advertiser-dashboard-wrapper">
      <Space direction="vertical">
        <h3>Available Credits: 100 Credits</h3>
        <CustomButton text="Buy credits" type="primary" />
      </Space>
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
      <Space direction="vertical">
        <h3>Matchmaking</h3>
        <CustomButton
          text="Matchmaking"
          type="primary"
          onClick={() => setMatchmakingVisible(true)}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Space>
      <Space direction="vertical" style={{ marginBottom: "1rem" }}>
        <h3>Campaigns</h3>
        <CustomButton
          text="New campaign"
          type="primary"
          onClick={() => setVisible(true)}
        />
      </Space>
      <Table
        dataSource={advertisementsByAdvertiser}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 20 }}
      />
      <AdvertisementDrawer
        visible={visible}
        setVisible={setVisible}
        createAdvertisement={createAdvertisement}
        onDashboard={true}
        advertisement={advertisement}
        isEdit={isEdit}
        clearEditAndAdvertisement={clearEditAndAdvertisement}
      />
      <MatchmakingDrawer
        visible={matchmakingVisible}
        setVisible={setMatchmakingVisible}
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
  getAdvertisementsTodayByPage,
  getAllActiveAdvertisements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertiser);
