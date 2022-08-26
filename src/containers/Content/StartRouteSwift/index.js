import React, { useEffect, useCallback} from "react";
import ChannelPage from "pages/Channel";
import { connect } from "react-redux";
import PublicEventPage from "pages/PublicEvent";
import { INTERNAL_LINKS } from "enum";
import { Route } from "react-router-dom";
import { getChannelForName, setBulChannelPage } from "redux/actions/channel-actions";
import { channelSelector } from "redux/selectors/channelSelector";
import { getUser } from "redux/actions/home-actions";

const StartRouteSwift = ({ 
  match,
  getChannelForName,
  setBulChannelPage,
  bulChannelPage,
  getUser
}) => {

  const {url} = match

  const fixNameUrl = useCallback((name) => {

    let spaces = name.split("-").length - 1
    let newTitle = name

    for(let i = 0; i < Number(spaces) ; i++){
      newTitle = newTitle.replace("-"," ")
    }
    return newTitle

  }, [])

  useEffect(() => {

      let isMounted = true;
      let pathNameFixed = url.substring(1,url.length)
      
      if (url) {
        getChannelForName( JSON.stringify({name: fixNameUrl(pathNameFixed)}) , (error) => {
          if (isMounted && error) {
            setBulChannelPage("event")
          }else{
            setBulChannelPage("channel")
          }
        });
      }
  
      return () => {
        isMounted = false;
      };
      
    }, [getChannelForName, fixNameUrl, url, setBulChannelPage]);

    useEffect(() => {
      getUser()
    },[getUser])

    return (
      <>
        {bulChannelPage === "channel" &&
          <Route
              path={`${INTERNAL_LINKS.CHANNEL_PAGE}/:name`}
              exact
              render={(props) => <ChannelPage {...props} />}
          />
        }
        {bulChannelPage === "event" &&
          <Route
              exact
              path={`${INTERNAL_LINKS.PUBLIC_EVENT}/:id`}
              render={(props) => <PublicEventPage {...props} />}
          />
        }
        
      </>
    );
};

const mapStateToProps = (state) => ({
  bulChannelPage: channelSelector(state).bulChannelPage,
});

const mapDispatchToProps = {
  getChannelForName,
  setBulChannelPage,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRouteSwift);