import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";

import "./style.scss";

const Menus = [
  {
    label: "Edit",
    value: "edit",
  },
  {
    label: "Delete",
    value: "delete",
  },
];

const CardMenu = ({ menus, className, children, onClick, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const ContentSection = () => (
    <div className="card-menu-dropdown-content">
      {menus.map((menu) => (
        <div
          className="card-menu-dropdown-menu"
          key={menu.value}
          onClick={() => setVisible(false) && onClick(menu.value)}
        >
          {menu.label}
        </div>
      ))}
    </div>
  );

  return (
    <Popover
      {...rest}
      className={clsx("card-menu-dropdown", className)}
      placement="bottomRight"
      trigger="click"
      visible={visible}
      content={<ContentSection />}
      onVisibleChange={setVisible}
    >
      {children}
    </Popover>
  );
};

CardMenu.propTypes = {
  menus: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

CardMenu.defaultProps = {
  menus: Menus,
  className: "",
  onClick: () => {},
};

export default CardMenu;
