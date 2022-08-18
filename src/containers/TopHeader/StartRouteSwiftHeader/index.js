import React from "react";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import { Route } from "react-router-dom";
import { PrivateRoute, PublicHeader, MainHeader } from "components";
import { channelSelector } from "redux/selectors/channelSelector";

const StartRouteSwiftHeader = ({ 
  bulChannelPage
}) => {

    return (
      <>
        {bulChannelPage === "channel" &&
            <PrivateRoute
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
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRouteSwiftHeader);