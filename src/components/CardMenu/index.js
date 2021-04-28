import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";

import { CARD_MENUS } from "enum";

import "./style.scss";

const CardMenu = ({ menus, className, children, onClick, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const onMenuClick = (e, menu) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    onClick(menu.value);
  };

  const ContentSection = () => (
    <div className="card-menu-dropdown-content">
      {menus.map((menu) => (
        <div
          className="card-menu-dropdown-menu"
          key={menu.value}
          onClick={(e) => onMenuClick(e, menu)}
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
  menus: CARD_MENUS.slice(0, 2),
  className: "",
  onClick: () => {},
};

export default CardMenu;
