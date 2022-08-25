import React from "react";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import { Sidebar } from "components";
import { Route } from "react-router-dom";
import { channelSelector } from "redux/selectors/channelSelector";
import { homeSelector } from "redux/selectors/homeSelector";

const StartRouteSwiftSider = ({ 
  bulChannelPage,
  userProfile
}) => {

    return (
      <>
        {bulChannelPage === "channel" && userProfile.id !== undefined &&
            <Route
                path={`${INTERNAL_LINKS.CHANNEL_PAGE}/:name`}
                exact
                render={() => <Sidebar />}
            />
        }
      </>
    );
};

const mapStateToProps = (state) => ({
    bulChannelPage: channelSelector(state).bulChannelPage,
    userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRouteSwiftSider);