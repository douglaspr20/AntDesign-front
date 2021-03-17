import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SIDEBAR_MENU_LIST, EVENT_TYPES } from "enum";
import CustomButton from "../../Button";
import ProfilePopupMenu from "../../ProfilePopupMenu";
import PremiumAlert from "../../PremiumAlert";
import Emitter from "services/emitter";
import { setCollapsed } from "redux/actions/env-actions";

import IconChevronDown from "images/icon-chevron-down.svg";

import { homeSelector } from "redux/selectors/homeSelector";
import { envSelector } from "redux/selectors/envSelector";

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
    const pathInfo = MenuList.find((item) => item.url === pathname);

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
              <span className="page-label">{pathInfo.label}</span>
            </>
          )}
        </div>
        <div className="main-header-right">
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
          <ProfilePopupMenu showPremiumAlert={this.showPremiumAlert}>
            <div className="user-avatar">
              {user.img ? (
                <img src={user.img} alt="user-avatar" />
              ) : (
                user.abbrName
              )}
            </div>
            <span className="user-name">{`${user.firstName || ""} ${
              user.lastName || ""
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
});

const mapDispatchToProps = {
  setCollapsed,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
