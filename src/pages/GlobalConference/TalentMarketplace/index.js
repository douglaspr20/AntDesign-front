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
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMarketplaceProfiles(userProfile.id);
  }, [getMarketplaceProfiles, userProfile]);

  const handlePaginated = (value) => {
    setPage(value);
  };

  return (
    <>
      <div className="speakers-list">
        <div className="speakers-list-container">
          {marketplaceProfiles.length > 0 &&
            marketplaceProfiles
              .slice((page - 1) * 20, page * 20)
              .map((marketplaceProfile, i) => (
                <ParticipantCard
                  key={i}
                  participant={marketplaceProfile}
                  marketplaceProfile
                />
              ))}
        </div>
        {marketplaceProfiles.length > 0 && (
          <Pagination
            defaultCurrent={page}
            defaultPageSize={20}
            total={marketplaceProfiles.length}
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
