import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import LogoSidebar from "images/logo-sidebar.svg";
// import { PublicMenuPopup } from "components";
// import { PUBLIC_HEADER_MENUS } from "enum";

import "./style.scss";

const PublicHeader = () => {
  return (
    <div className="public-header">
      <div className="public-header-left">
        <div className="hr-logo">
          <img src={LogoSidebar} alt="sidebar-logo" />
        </div>
      </div>
      <div className="public-header-right">
        {/* {PUBLIC_HEADER_MENUS.map((menu, index) => (
          <Link key={index} to={menu.url}>
            <span className="public-header-menu">{menu.text}</span>
          </Link>
        ))} */}
        {/* <PublicMenuPopup>
          <div className="public-header-bar">
            <i className="fal fa-bars" />
          </div>
        </PublicMenuPopup> */}
      </div>
    </div>
  );
};

PublicHeader.propTypes = {
  title: PropTypes.string,
};

PublicHeader.defaultProps = {
  title: "",
};

export default PublicHeader;
