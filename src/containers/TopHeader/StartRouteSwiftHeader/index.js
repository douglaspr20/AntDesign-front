import React from "react";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import { Route } from "react-router-dom";
import { PublicHeader, MainHeader } from "components";
import { channelSelector } from "redux/selectors/channelSelector";
import { homeSelector } from "redux/selectors/homeSelector";

const StartRouteSwiftHeader = ({ 
  bulChannelPage,
  userProfile
}) => {

  return (
    <>
      {bulChannelPage === "channel" && userProfile?.id === undefined &&
          <Route
              path={`${INTERNAL_LINKS.CHANNEL_PAGE}/:name`}
              exact
              render={(props) => <PublicHeader bulChannelPage={bulChannelPage} {...props} />}
          />
      }
      {bulChannelPage === "channel" && userProfile?.id !== undefined &&
          <Route
              path={`${INTERNAL_LINKS.CHANNEL_PAGE}/:name`}
              exact
              render={(props) => <MainHeader {...props} />}
          />
      }
      {bulChannelPage === "event" &&
          <Route
              exact
              path={`${INTERNAL_LINKS.PUBLIC_EVENT}/:id`}
              render={(props) => <PublicHeader {...props} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(StartRouteSwiftHeader);