import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";
import { connect } from "react-redux";

import { CustomButton } from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as authActions } from "redux/actions/auth-actions";

import "./style.scss";

// const ProfileMenus = ["Settings", "Account"];
const ProfileMenus = [];

class ProfilePopupMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  onViewProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
    this.setState({ visible: false });
  };

  onVisibleChange = (visible) => {
    this.setState({ visible });
  };

  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { className, children, ...rest } = this.props;
    const { visible } = this.state;
    const { userProfile: user } = this.props;

    const TitleSection = () => (
      <div className="profile-popover-title" onClick={this.onViewProfile}>
        <div className="user-avatar">
          {user && user.img ? (
            <img src={user ? user.img : ""} alt="user-avatar" />
          ) : (
            (user || {}).abbrName
          )}
        </div>
        <div className="user-info">
          <p className="user-info-name">{`${user ? user.firstName || "" : ""} ${
            user ? user.lastName || "" : ""
          }`}</p>
          <p className="user-info-view">View profile</p>
        </div>
      </div>
    );

    const ContentSection = () => (
      <div
        className={clsx("profile-popover-content", {
          empty: ProfileMenus.length === 0,
        })}
      >
        {ProfileMenus.map((menu, index) => (
          <div key={index} className="profile-popover-content-menu">
            {menu}
          </div>
        ))}
        <div className="profile-popover-content-footer">
          <CustomButton
            text="Log out"
            className="log-out"
            type="primary outlined"
            size="xs"
            onClick={this.onLogout}
          />
        </div>
      </div>
    );

    return (
      <Popover
        {...rest}
        className={clsx("profile-popover", className)}
        placement="bottomRight"
        trigger="click"
        visible={visible}
        title={<TitleSection />}
        content={<ContentSection />}
        onVisibleChange={this.onVisibleChange}
      >
        {children}
      </Popover>
    );
  }
}

ProfilePopupMenu.propTypes = {
  title: PropTypes.string,
  logout: PropTypes.func,
};

ProfilePopupMenu.defaultProps = {
  title: "",
  logout: () => {},
};

const mapStateToProps = (state) => homeSelector(state);

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopupMenu);
