import React, { useEffect, useCallback, useState} from "react";
import ChannelPage from "pages/Channel";
import { connect } from "react-redux";
import PublicEventPage from "pages/PublicEvent";
import { INTERNAL_LINKS } from "enum";
import { Route } from "react-router-dom";
import { getChannelForName, setBulChannelPage, setChannel } from "redux/actions/channel-actions";
import { channelSelector } from "redux/selectors/channelSelector";
import { homeSelector } from "redux/selectors/homeSelector";

const StartRouteSwift = ({ 
  match,
  getChannelForName,
  setBulChannelPage,
  bulChannelPage,
  allChannels,
  setChannel,
  userProfile
}) => {

  const {url} = match
  const [channelOptimizate, setChannelOptimizate] = useState(false)

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

      let filter = allChannels.filter((channel) => {
        return channel.name === fixNameUrl(pathNameFixed)
      })
      
      if (url && filter[0]?.name !== fixNameUrl(pathNameFixed)) {
        getChannelForName( JSON.stringify({name: fixNameUrl(pathNameFixed)}) , (error) => {
          if (isMounted && error) {
            setBulChannelPage("event")
          }else{
            setBulChannelPage("channel")
          }
        });
      }else{
        setChannel({
          followers: filter[0].followers,
          channel: {
            User: userProfile,
            ...filter[0],
            followers: []
          },
        })
        setBulChannelPage("channel")
        setChannelOptimizate(true)
      }
  
      return () => {
        isMounted = false;
      };
      
    }, [getChannelForName, fixNameUrl, url, setBulChannelPage, allChannels, setChannel, userProfile]);

    return (
      <>
        {bulChannelPage === "channel" &&
          <Route
              path={`${INTERNAL_LINKS.CHANNEL_PAGE}/:name`}
              exact
              render={(props) => <ChannelPage {...props} channelOptimizate={channelOptimizate} />}
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
  allChannels: channelSelector(state).allChannels,
  userProfile: homeSelector(state).userProfile
});

const mapDispatchToProps = {
  getChannelForName,
  setBulChannelPage,
  setChannel
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRouteSwift);