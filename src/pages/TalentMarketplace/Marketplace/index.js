import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

import { connect } from "react-redux";
import { marketplaceProfileSelector } from "redux/selectors/marketplaceProfile";
import { homeSelector } from "redux/selectors/homeSelector";
import { getMarketplaceProfiles } from "redux/actions/marketplaceProfile-actions";
import { ParticipantCard } from "components";

import "./styles.scss";

const Marketplace = ({
  marketplaceProfiles,
  getMarketplaceProfiles,
  userProfile,
  filters,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMarketplaceProfiles({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    getMarketplaceProfiles(filters);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handlePaginated = (value) => {
    setPage(value);
  };

  return (
    <>
      <div className="speaker-list">
        <div className="speaker-list-container">
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
          <div className="pagination">
            <Pagination
              defaultCurrent={page}
              defaultPageSize={20}
              total={marketplaceProfiles.length}
              showSizeChanger={false}
              onChange={handlePaginated}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
