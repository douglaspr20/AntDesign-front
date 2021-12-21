import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { marketplaceProfileSelector } from "redux/selectors/marketplaceProfile";
import { getMarketplaceProfiles } from "redux/actions/marketplaceProfile-actions";
import { ParticipantCard } from "components";
import "./style.scss";

const TalentMarketplace = (
  userProfile,
  marketplaceProfiles,
  getMarketplaceProfiles
) => {
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   getMarketplaceProfiles();
  // }, [getMarketplaceProfiles]);

  const handlePaginated = (value) => {
    setPage(value);
  };

  console.log(marketplaceProfiles);
  return (
    <div className="speakers-list">
      <div className="speakers-list-container">
        {/* {participants.length > 0 &&
          participants
            .slice((page - 1) * 20, page * 20)
            .map((participant, i) => (
              <ParticipantCard key={i} participant={participant} />
            ))} */}
      </div>
      <Pagination
        defaultCurrent={page}
        defaultPageSize={20}
        // total={participants.length}
        showSizeChanger={false}
        onChange={handlePaginated}
        style={{ marginTop: "1.5rem" }}
      />
    </div>
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
