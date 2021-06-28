import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  SIDEBAR_MENU_LIST,
  EVENT_TYPES,
  INTERNAL_LINKS,
} from "enum";
import CustomButton from "../../Button";
import ProfilePopupMenu from "../../ProfilePopupMenu";
import PremiumAlert from "../../PremiumAlert";
import Emitter from "services/emitter";
import { setCollapsed } from "redux/actions/env-actions";
import Notification from "containers/Notification";

import IconChevronDown from "images/icon-chevron-down.svg";
import IconTvOutline from "images/icon-tv-outline.svg";
import IconNotification from "images/icon-notification-header.svg";
import IconMedal from "images/icon-medal.svg";
import IconHeadsetOutline from "images/icon-headset-outline.svg";

import { homeSelector } from "redux/selectors/homeSelector";
import { envSelector } from "redux/selectors/envSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { liveSelector } from "redux/selectors/liveSelector";
import { courseSelector } from "redux/selectors/courseSelector";
import { podcastSelector } from "redux/selectors/podcastSelector";

import "./style.scss";

const MenuList = [
  ...SIDEBAR_MENU_LIST.TOP_MENUS,
  ...SIDEBAR_MENU_LIST.BOTTOM_MENUS,
];

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visiblePremiumAlert: false,
    };
  }

  planUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  inviteFriend = () => {
    Emitter.emit(EVENT_TYPES.OPEN_INVITE_FRIEND_MODAL);
  };

  onShowSidebar = () => {
    this.props.setCollapsed(false);
  };

  onHideAlert = () => {
    this.setState({ visiblePremiumAlert: false });
  };

  showPremiumAlert = () => {
    this.setState({ visiblePremiumAlert: true });
  };

  render() {
    const { userProfile: user } = this.props;
    const { visiblePremiumAlert } = this.state;
    const { pathname } = this.props.history.location || {};
    let pathInfo = MenuList.find((item) => item.url.includes(pathname));

    if (pathname === INTERNAL_LINKS.NOTIFICATIONS) {
      pathInfo = {
        icon: IconNotification,
        label: "Notifications",
      }
    } else if (!pathInfo && pathname.includes(`${INTERNAL_LINKS.CHANNELS}/`)) {
      const { selectedChannel } = this.props;
      pathInfo = {
        icon: IconTvOutline,
        label: (selectedChannel || {}).name || "",
      };
    }

    if (!pathInfo && pathname.includes(`${INTERNAL_LINKS.PODCAST_SERIES}`)) {
      const { podcastSeries } = this.props;
      pathInfo = {
        icon: IconHeadsetOutline,
        label: (podcastSeries || {}).title || "Podcast Series",
      };
    }

    if (!pathInfo && pathname.includes(`${INTERNAL_LINKS.MICRO_CLASS}/`)) {
      const { selectedCourse } = this.props;
      pathInfo = {
        icon: IconMedal,
        label: `Class - ${(selectedCourse || {}).title || ""}`,
      };
    }

    return (
      <div className="main-header">
        <div className="main-header-left">
          {this.props.isMobile && (
            <div className="main-header-left-menu" onClick={this.onShowSidebar}>
              <i className="fal fa-bars" />
            </div>
          )}
          {pathInfo && (
            <>
              <div className="page-icon">
                <img src={pathInfo.icon} alt="page-icon" />
              </div>
              <span className="page-label">
                {pathInfo.url === INTERNAL_LINKS.GLOBAL_CONFERENCE
                  ? "Hacking HR 2022 Global Online Conference"
                  : pathInfo.label}
              </span>
            </>
          )}
        </div>
        <div className="main-header-right">
          {this.props.live.live === true &&
            <CustomButton
              text={<div className="live-container"><div className="live-circle"></div><div>LIVE</div></div>}
              type="primary"
              size="lg"
              className="outlined btn-live"
              onClick={() => { this.props.history.push(INTERNAL_LINKS.LIVE); }}
            />
          }
          <CustomButton
            text="Invite friend"
            type="primary"
            size="lg"
            className="btn-invite"
            onClick={this.inviteFriend}
          />
          {user.memberShip === "free" && (
            <CustomButton
              text="Upgrade"
              type="primary"
              size="lg"
              className="btn-upgrade"
              onClick={this.planUpgrade}
            />
          )}
          <Notification className="main-header-notification" />
          <ProfilePopupMenu showPremiumAlert={this.showPremiumAlert}>
            <div className="user-avatar">
              {user.img ? (
                <img src={user.img} alt="user-avatar" />
              ) : (
                user.abbrName
              )}
            </div>
            <span className="user-name">{`${user.firstName || ""} ${user.lastName || ""
              }`}</span>
            <div className="profile-menu-chevron">
              <img src={IconChevronDown} alt="profile-menu" />
            </div>
          </ProfilePopupMenu>
        </div>
        <PremiumAlert
          visible={visiblePremiumAlert}
          onCancel={() => this.onHideAlert()}
        />
      </div>
    );
  }
}

MainHeader.propTypes = {
  title: PropTypes.string,
};

MainHeader.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  isMobile: envSelector(state).isMobile,
  selectedChannel: channelSelector(state).selectedChannel,
  live: liveSelector(state).live,
  selectedCourse: courseSelector(state).course,
  podcastSeries: podcastSelector(state).podcastSeries,
});

const mapDispatchToProps = {
  setCollapsed,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
