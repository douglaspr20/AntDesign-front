import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { setCollapsed } from "redux/actions/env-actions";
import { injectIntl } from "react-intl";
import { Link, withRouter } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

import Emitter from "services/emitter";
import { SIDEBAR_MENU_LIST, INTERNAL_LINKS, EVENT_TYPES } from "enum";
import SidebarMenuItem from "./SidebarMenuItem";
import LogoSidebar from "images/logo-sidebar.svg";

import { envSelector } from "redux/selectors/envSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const { Sider } = Layout;
const TopMenuList = SIDEBAR_MENU_LIST.TOP_MENUS;
// const BottomMenuList = SIDEBAR_MENU_LIST.BOTTOM_MENUS;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirewall: false,
      isAddStoryEvent: false,
    };

    Emitter.on(EVENT_TYPES.SHOW_FIREWALL, () => {
      this.setState({ showFirewall: true, isAddStoryEvent: true });
    });
  }

  onCloseSidebar = () => {
    const { isMobile } = this.props.env || {};
    if (isMobile) {
      this.props.setCollapsed(true);
    }
  };

  onClickMenu = (e, url) => {
    const { isMobile } = this.props.env || {};

    if (
      url === INTERNAL_LINKS.MENTORING &&
      this.props.userProfile.percentOfCompletion !== 100
    ) {
      e.preventDefault();
      this.setState({ showFirewall: true });
    } else if (isMobile) {
      this.props.setCollapsed(true);
    }
  };

  render() {
    // When adding new menu item give it's key the pathname
    //this.props.location.pathname
    const { isMobile, siderMenuCollapsed } = this.props.env || {};
    const siderProp = isMobile
      ? { breakpoint: "lg", collapsedWidth: "0", collapsible: true }
      : { collapsible: true };
    const navBarTheme = "light";
    const collapsed = isMobile ? siderMenuCollapsed : false;
    const { showFirewall } = this.state;

    const menuStyle = {
      // laggy for now
      // position:'fixed',overflow: "hidden !important",maxWidth:"200px"
    };
    return (
      <Sider
        {...siderProp}
        collapsed={collapsed}
        theme={navBarTheme}
        trigger={null}
        style={{ zIndex: 999 }}
        width={isMobile ? 272 : 108}
        className="layout-sidebar"
      >
        <div className="layout-sidebar-logo">
          <div className="layout-sidebar-logo-container">
            <Link to={INTERNAL_LINKS.HOME}>
              <img src={LogoSidebar} alt="sidebar-logo" />
            </Link>
          </div>
        </div>
        <Menu
          theme={navBarTheme}
          selectedKeys={[this.props.location.pathname]}
          mode="inline"
          style={menuStyle}
          className="layout-sidebar-top-menus"
        >
          {TopMenuList.map((menu) => (
            <Menu.Item key={menu.url} className="layout-sidebar-menu">
              <Link
                to={menu.url}
                onClick={(e) => this.onClickMenu(e, menu.url)}
              >
                <SidebarMenuItem icon={menu.icon} text={menu.label} />
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        {/* <Menu
          theme={navBarTheme}
          selectedKeys={[this.props.location.pathname]}
          mode="inline"
          style={menuStyle}
          className="layout-sidebar-bottom-menus"
        >
          {BottomMenuList.map((menu) => (
            <Menu.Item key={menu.url} className="layout-sidebar-menu">
              <Link to={menu.url} onClick={this.onCloseSidebar}>
                <SidebarMenuItem icon={menu.icon} text={menu.label} />
              </Link>
            </Menu.Item>
          ))}
        </Menu> */}
        {isMobile && (
          <div className="layout-sidebar-close">
            <CloseOutlined onClick={this.onCloseSidebar} />
          </div>
        )}
        {showFirewall && (
          <div
            className="sidebar-firewall"
            onClick={() =>
              this.setState({ showFirewall: false, isAddStoryEvent: false })
            }
          >
            <div className="upgrade-notification-panel">
              <h3>
                {this.state.isAddStoryEvent === true ? (
                  <>You must fully complete your profile before adding story or comment.</>
                ) : (
                  <>
                    You must fully complete your profile before joining the
                    mentoring feature.
                  </>
                )}
              </h3>
            </div>
          </div>
        )}
      </Sider>
    );
  }
}
const mapStateToProps = (state) => ({
  env: envSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  setCollapsed,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(NavBar))
);
