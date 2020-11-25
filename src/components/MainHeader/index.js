import React from "react";
import PropTypes from "prop-types";

import { SIDEBAR_MENU_LIST } from "enum";
import CustomButtom from "../Button";

import IconChevronDown from "images/icon-chevron-down.svg";

import "./style.scss";

const MenuList = [
  ...SIDEBAR_MENU_LIST.TOP_MENUS,
  ...SIDEBAR_MENU_LIST.BOTTOM_MENUS,
];

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        img: null,
        name: "Edgar davis",
        abbrName: "ED",
      },
    };
  }

  render() {
    const { user } = this.state;
    const { pathname } = this.props.history.location || {};
    const pathInfo = MenuList.find((item) => item.url === pathname);

    return (
      <div className="main-header">
        <div className="main-header-left">
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
          <CustomButtom
            text="Upgrade"
            type="primary"
            size="lg"
            className="btn-upgrade"
          />
          <div className="user-avatar">
            {user.img ? (
              <img src={user.img} alt="user-avatar" />
            ) : (
              user.abbrName
            )}
          </div>
          <span className="user-name">{user.name}</span>
          <div className="profile-menu-chevron">
            <img src={IconChevronDown} alt="profile-menu" />
          </div>
        </div>
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

export default MainHeader;
