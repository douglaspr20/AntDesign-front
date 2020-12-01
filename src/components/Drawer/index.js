import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Drawer } from "antd";

import "./style.scss";

class CustomDrawer extends React.Component {
  render() {
    const { className, width, children, title, ...rest } = this.props;

    return (
      <Drawer
        {...rest}
        title={<h2>{title}</h2>}
        className={clsx("custom-drawer", className)}
        placement="right"
        closable={true}
        width={width}
      >
        {children}
      </Drawer>
    );
  }
}

CustomDrawer.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

CustomDrawer.defaultProps = {
  title: "Drawer",
  width: 772,
};

export default CustomDrawer;
