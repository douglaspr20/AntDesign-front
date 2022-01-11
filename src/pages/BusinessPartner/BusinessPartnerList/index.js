import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CustomButton } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";

import { CARD_TYPE } from "enum";
import { SETTINGS } from "enum";

import { businessPartnerSelector } from "redux/selectors/businessPartnerSelector";

import IconLoadingMore from "images/icon-loading-more.gif";
import {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  createBusinessPartnerResource,
  updateBusinessPartnerResourcesInformation,
} from "redux/actions/business-partner-actions";

import BusinessPartnerCard from "../BusinessPartnerCard";
import { isEmpty } from "lodash";

const BusinessPartnerList = ({
  total,
  page,
  filter,
  channel,
  isOwner,
  loading,
  type,
  refresh,
  getMoreChannelLibraryList,
  getBusinessPartnerResources,
  businessPartnerResources,
  setCurrentValue,
  createBusinessPartnerResource,
}) => {
  const [topics, setTopics] = useState(filter.topics || []);
  const [resources, setResources] = useState(businessPartnerResources);

  const onShowMore = () => {
    getMoreChannelLibraryList(
      {
        ...filter,
        channel: channel.id,
        contentType: type,
        page: page + 1,
      },
      "newest-first"
    );
  };

  useEffect(() => {
    setTopics(JSON.parse(filter.topics || "[]"));
  }, [filter]);

  useEffect(() => {
    setResources(businessPartnerResources);
    let filterResources = [];
    if (topics && !isEmpty(topics)) {
      topics.some((el) => {
        return businessPartnerResources.filter((item) =>
           item.topics.map((topic) => {
            if (topic === el) {
              return filterResources.push(item)
            }
            return filterResources
          })
        );
      });
      setResources(filterResources);
    }
  }, [topics, businessPartnerResources, filter]);

  useEffect(() => {
    if (refresh) {
      getBusinessPartnerResources();
      setResources(businessPartnerResources);
    }
    setResources(businessPartnerResources);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, createBusinessPartnerResource]);

  return (
    <div className="channel-page__list-wrap">
      {!isOwner && resources?.length === 0 ? (
        <NoItemsMessageCard
          message={`There are no ${
            type === "article" ? "resources" : "videos"
          } for you at the moment`}
        />
      ) : (
        <>
          <div className="channels__list">
            {isOwner && <BusinessPartnerCard type={CARD_TYPE.ADD} />}
            {resources?.map((item, index) => (
              <BusinessPartnerCard
                type={isOwner ? CARD_TYPE.EDIT : CARD_TYPE.VIEW}
                key={index}
                data={item}
                // onMenuClick={(menu) => handleLibrary(menu, item)}
                setCurrentValue={setCurrentValue}
              />
            ))}
          </div>
          {page * SETTINGS.MAX_SEARCH_ROW_NUM < total && (
            <div className="channel-page-loading d-flex justify-center items-center">
              {loading ? (
                <div className="channel-page-loading-more">
                  <img src={IconLoadingMore} alt="loading-more-img" />
                </div>
              ) : (
                <CustomButton
                  text="Show More"
                  type="primary outlined"
                  onClick={onShowMore}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

BusinessPartnerList.propTypes = {
  resources: PropTypes.array,
  isOwner: PropTypes.bool,
  refresh: PropTypes.bool,
  filter: PropTypes.object,
  type: PropTypes.string,
};

BusinessPartnerList.defaultProps = {
  resources: [],
  isOwner: false,
  refresh: false,
  filter: {},
  type: "article",
};

const mapStateToProps = (state) => ({
  businessPartnerResources: businessPartnerSelector(state).businessPartnerResources,
});

const mapDispatchToProps = {
  getBusinessPartnerResources,
  setBusinessPartnerResources,
  createBusinessPartnerResource,
  updateBusinessPartnerResourcesInformation,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPartnerList);
