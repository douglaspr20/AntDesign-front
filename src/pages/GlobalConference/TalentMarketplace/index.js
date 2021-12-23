import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

import { connect } from "react-redux";
import { marketplaceProfileSelector } from "redux/selectors/marketplaceProfile";
import { homeSelector } from "redux/selectors/homeSelector";
import { getMarketplaceProfiles } from "redux/actions/marketplaceProfile-actions";
import { ParticipantCard } from "components";

import "./style.scss";

const TalentMarketplace = ({
  marketplaceProfiles,
  getMarketplaceProfiles,
  userProfile,
  filters,
}) => {
  const [page, setPage] = useState(1);
  const [marketplaceProfileData, setMarketplaceProfileData] = useState([]);

  useEffect(() => {
    getMarketplaceProfiles(userProfile.id);
  }, [getMarketplaceProfiles, userProfile]);

  const handlePaginated = (value) => {
    setPage(value);
  };

  useEffect(() => {
    let dataFiltered = [];
    function checkAvailability(arr, val) {
      return arr.some((arrVal) => val === arrVal);
    }

    if (filters.categories) {
      const categories = JSON.parse(filters.categories);
      if (categories.length > 0) {
        dataFiltered = marketplaceProfiles.filter((marketplaceProfile) => {
          let canFiltered = false;
          for (const category of categories) {
            if (checkAvailability(marketplaceProfile.topics, category)) {
              canFiltered = true;
              break;
            }
          }
          if (canFiltered) {
            return marketplaceProfile;
          }

          return null;
        });
        setMarketplaceProfileData(dataFiltered);
      } else {
        dataFiltered = marketplaceProfiles;
      }
    } else {
      dataFiltered = marketplaceProfiles;
    }

    if (filters.joblevels) {
      const joblevels = JSON.parse(filters.joblevels);

      if (joblevels.length > 0) {
        const data = dataFiltered.filter((marketplaceProfile) => {
          let canFiltered = false;

          for (const jobLevel of joblevels) {
            if (marketplaceProfile.lookingFor === jobLevel) {
              canFiltered = true;
              break;
            }
          }

          if (canFiltered) {
            return marketplaceProfile;
          }

          return null;
        });

        setMarketplaceProfileData(data);
      } else {
        setMarketplaceProfileData(dataFiltered);
      }
    } else {
      setMarketplaceProfileData(dataFiltered);
    }

    if (filters.location) {
      const locations = JSON.parse(filters.location);
      if (locations.length > 0) {
        dataFiltered = dataFiltered.filter((marketplaceProfile) => {
          let canFiltered = false;
          for (const location of locations) {
            if (checkAvailability(marketplaceProfile.location, location)) {
              canFiltered = true;
              break;
            }
          }
          if (canFiltered) {
            return marketplaceProfile;
          }

          return null;
        });
        setMarketplaceProfileData(dataFiltered);
      } else {
        setMarketplaceProfileData(dataFiltered);
      }
    } else {
      setMarketplaceProfileData(dataFiltered);
    }
  }, [filters, marketplaceProfiles]);

  return (
    <>
      <div className="speakers-list">
        <div className="speakers-list-container">
          {marketplaceProfileData.length > 0 &&
            marketplaceProfileData
              .slice((page - 1) * 20, page * 20)
              .map((marketplaceProfile, i) => (
                <ParticipantCard
                  key={i}
                  participant={marketplaceProfile}
                  marketplaceProfile
                />
              ))}
        </div>
        {marketplaceProfileData.length > 0 && (
          <Pagination
            defaultCurrent={page}
            defaultPageSize={20}
            total={marketplaceProfileData.length}
            showSizeChanger={false}
            onChange={handlePaginated}
            style={{ marginTop: "1.5rem" }}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  marketplaceProfiles: marketplaceProfileSelector(state).marketplaceProfiles,
});

const mapDispatchToProps = {
  getMarketplaceProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(TalentMarketplace);
