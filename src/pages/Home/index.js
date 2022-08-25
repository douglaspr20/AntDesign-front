/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import AdvertisementDrawer from "containers/AdvertisementDrawer";

import ProfileStatusBar from "./ProfileStatusBar";
import { PostsFilterPanel, CustomButton } from "components";

import Posts from "containers/Posts";
import FilterDrawer from "../Home/FilterDrawer";

import { getUser } from "redux/actions/home-actions";
import { getAllPost } from "redux/actions/post-actions";
import { getRecommendations } from "redux/actions/library-actions";

import { homeSelector } from "redux/selectors/homeSelector";
import { librarySelector } from "redux/selectors/librarySelector";
import { postSelector } from "redux/selectors/postSelector";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";
import {
  getAdvertisementsTodayByPage,
  getAdvertisementById,
  createAdvertisementClick,
} from "redux/actions/advertisment-actions";

import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";
import TrendingItem from "./TrendingItem";

const HomePage = ({
  history,
  location,
  userProfile,
  recommendations,
  getRecommendations,
  getUser,
  currentPage,
  getAllPost,
  getAdvertisementsTodayByPage,
  advertisementsByPage,
  getAdvertisementById,
  advertisementById,
  isAdPreview = false,
  createAdvertisementClick,
}) => {
  const [filters, setFilters] = useState({});
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [hasAdvertisementData, setHasAdvertisementData] = useState(null);
  const { id } = useParams();

  const onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  useEffect(() => {
    const { refresh } = queryString.parse(location.search);
    if (refresh === 1) {
      getUser();
    }

    getRecommendations();
    getAllPost({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAdPreview) {
      getAdvertisementById(id);
    } else {
      getAdvertisementsTodayByPage("home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (
      advertisementsByPage !== undefined &&
      advertisementsByPage.home !== undefined
    ) {
      if (advertisementsByPage?.home[0] !== undefined) {
        setHasAdvertisementData(true);
      } else {
        setHasAdvertisementData(false);
      }
    } else {
      setHasAdvertisementData(false);
    }
  }, [advertisementsByPage]);

  const onFilterChange = (filter) => {
    getAllPost({ ...filter, text });
    setFilters(filter);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  const onSearch = (value) => {
    getAllPost({
      ...filters,
      text: value,
    });
    setText(value);
  };

  const onShowMore = () => {
    getAllPost({
      ...filters,
      text,
      page: currentPage + 1,
    });
  };

  const displayAds = hasAdvertisementData && (
    <div className="home-advertisement-wrapper" style={{ marginRight: 10 }}>
      {advertisementsByPage?.home?.map((advertisement) => {
        return (
          <div
            className="home-advertisement-wrapper-content"
            key={advertisement?.id}
          >
            <div
              className="advertisement"
              onClick={() => {
                createAdvertisementClick(advertisement?.id);
                window.open(advertisement?.advertisementLink, "_blank");
              }}
            >
              <img
                src={advertisement?.adContentLink}
                alt="advertisement"
                className="advertisement-img"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const displayPreviewAd = isAdPreview && (
    <div className="home-advertisement-wrapper-preview">
      <div
        className="advertisement"
        onClick={() =>
          window.open(advertisementById?.advertisementLink, "_blank")
        }
      >
        <img
          src={advertisementById?.adContentLink}
          alt="advertisement"
          className="advertisement-img"
        />
      </div>
    </div>
  );

  return (
    <div className="home-page-container">
      <div className="home-page-container--trending">
        <h3>Trending</h3>
        <div className="items">
          {recommendations.podcasts && (
            <>
              {recommendations.podcasts.map((item, index) => (
                <TrendingItem
                  key={`trending-podcast-${index}`}
                  type="podcast"
                  element={item}
                />
              ))}
            </>
          )}

          {recommendations.conferenceLibrary && (
            <>
              {recommendations.conferenceLibrary.map((item, index) => (
                <TrendingItem
                  key={`trending-conference-${index}`}
                  type="conference"
                  element={item}
                />
              ))}
            </>
          )}

          {recommendations.libraries && (
            <>
              {recommendations.libraries.map((item, index) => (
                <TrendingItem
                  key={`trending-library-${index}`}
                  type="library"
                  element={item}
                />
              ))}
            </>
          )}
          {recommendations.events && (
            <>
              {recommendations.events.map((item, index) => (
                <TrendingItem
                  key={`trending-event-${index}`}
                  type="event"
                  element={item}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="home-page-container--posts">
        <PostsFilterPanel
          title="Stories filter"
          onChange={onFilterChange}
          onSearch={onSearch}
        />
        <div className="home-page-container--posts-central-panel">
          {userProfile && userProfile.percentOfCompletion !== 100 && (
            <div className="home-page-container--profile">
              <ProfileStatusBar user={userProfile} />
            </div>
          )}
          <div className={`home-page-container${"--mobile-options"}`}>
            <FilterDrawer onChange={onFilterChange} onSearch={onSearch} />
            <Button
              onClick={() => {
                showFilterPanel();
              }}
            >
              Filters
            </Button>
          </div>
          <div className="home-page-container--upgrade">
            {userProfile && userProfile.memberShip === "free" && (
              <div className="recommend-card">
                <h2 className="recommend-card-label">
                  Upgrade to a PREMIUM Membership and get unlimited access to
                  the LAB features
                </h2>
                <CustomButton
                  text="Upgrade to PREMIUM"
                  type="primary"
                  size="xl"
                  className="recommend-card-upgrade-2"
                  onClick={onUpgrade}
                />
              </div>
            )}
          </div>
          <div className="home-page-container--posts">
            <div className="home-page-container-central-panel">
              <Posts onShowMore={onShowMore} history={history} />
            </div>
            {displayAds}
            {displayPreviewAd}
          </div>
        </div>
      </div>
      <AdvertisementDrawer
        page="home"
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  recommendations: librarySelector(state).recommendations,
  currentPage: postSelector(state).currentPage,
  ...advertisementSelector(state),
});

const mapDispatchToProps = {
  getRecommendations,
  getUser,
  getAllPost,
  getAdvertisementsTodayByPage,
  getAdvertisementById,
  createAdvertisementClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
