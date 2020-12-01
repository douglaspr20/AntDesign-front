import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";

import { CustomButton } from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

const ProfileMenus = ["Settings", "Account"];

class ProfilePopupMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        img: null,
        name: "Edgar davis",
        abbrName: "ED",
      },
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

  render() {
    const { className, children, ...rest } = this.props;
    const { user, visible } = this.state;

    const TitleSection = () => (
      <div className="profile-popover-title" onClick={this.onViewProfile}>
        <div className="user-avatar">
          {user.img ? <img src={user.img} alt="user-avatar" /> : user.abbrName}
        </div>
        <div className="user-info">
          <p className="user-info-name">{user.name}</p>
          <p className="user-info-view">View profile</p>
        </div>
      </div>
    );

    const ContentSection = () => (
      <div className="profile-popover-content">
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
};

ProfilePopupMenu.defaultProps = {
  title: "",
};

export default ProfilePopupMenu;
