import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./style.scss";

class CustomDrawer extends React.Component {
  render() {
    const { className, width, children, title, onClose, ...rest } = this.props;

    return (
      <Drawer
        {...rest}
        title={<h2>{title}</h2>}
        className={clsx("custom-drawer", className, { "no-header": !title })}
        placement="right"
        closable={true}
        onClose={onClose}
        width={width}
      >
        {children}
        {!title && (
          <div className="custom-drawer-close">
            <CloseOutlined onClick={onClose} />
          </div>
        )}
      </Drawer>
    );
  }
}

CustomDrawer.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  onClose: PropTypes.func,
};

CustomDrawer.defaultProps = {
  title: "Drawer",
  width: 772,
  onClose: () => {},
};

export default CustomDrawer;
