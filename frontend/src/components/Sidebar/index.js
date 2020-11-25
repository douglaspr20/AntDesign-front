import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { setCollapsed } from "redux/actions/env-actions";
import { injectIntl } from "react-intl";
import { Link, withRouter } from "react-router-dom";

import { SIDEBAR_MENU_LIST } from "enum";
import SidebarMenuItem from "./SidebarMenuItem";

import "./style.scss";

const { Sider } = Layout;
const TopMenuList = SIDEBAR_MENU_LIST.TOP_MENUS;
const BottomMenuList = SIDEBAR_MENU_LIST.BOTTOM_MENUS;

class NavBar extends Component {
  onCollapse = (collapsed) => {
    this.props.setCollapsed(collapsed);
  };

  toggle = () => {
    this.props.setCollapsed(!this.props.env.siderMenuCollapsed);
  };

  render() {
    // When adding new menu item give it's key the pathname
    //this.props.location.pathname
    const siderProp = this.props.env.isMobile
      ? { breakpoint: "lg", collapsedWidth: "0", collapsible: false }
      : { collapsible: false };
    const navBarTheme = "light";
    const menuStyle = {
      // laggy for now
      // position:'fixed',overflow: "hidden !important",maxWidth:"200px"
    };
    return (
      <Sider
        {...siderProp}
        theme={navBarTheme}
        style={{ zIndex: 10 }}
        width={108}
        className="layout-sidebar"
      >
        <div className="layout-sidebar-logo">
          <div className="layout-sidebar-logo-container">
            <img src={TopMenuList[0].icon} alt="sidebar-logo" />
          </div>
        </div>
        <Menu
          theme={navBarTheme}
          defaultSelectedKeys={[this.props.location.pathname]}
          mode="inline"
          style={menuStyle}
          className="layout-sidebar-top-menus"
        >
          {TopMenuList.map((menu) => (
            <Menu.Item key={menu.url} className="layout-sidebar-menu">
              <Link to={menu.url}>
                <SidebarMenuItem icon={menu.icon} text={menu.label} />
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <Menu
          theme={navBarTheme}
          defaultSelectedKeys={[this.props.location.pathname]}
          mode="inline"
          style={menuStyle}
          className="layout-sidebar-bottom-menus"
        >
          {BottomMenuList.map((menu) => (
            <Menu.Item key={menu.url} className="layout-sidebar-menu">
              <Link to={menu.url}>
                <SidebarMenuItem icon={menu.icon} text={menu.label} />
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};

const mapDispatchToProps = {
  setCollapsed,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(NavBar))
);
