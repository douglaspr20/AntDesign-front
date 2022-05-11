import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { SpecialtyItem } from "components";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS, CARD_MENUS, CARD_TYPE } from "enum";
import { categorySelector } from "redux/selectors/categorySelector";
import CardMenu from "components/CardMenu";

import { ReactComponent as IconPlus } from "images/icon-plus.svg";
import IconMenu from "images/icon-menu.svg";

import "./style.scss";
import moment from "moment";

const BlogCard = ({
  id,
  title,
  type,
  onAdd,
  description,
  image,
  allCategories,
  categories,
  date,
  isOwner,
  onMenuClick,
}) => {
  return (
    <Link
      className={clsx("blog-card", { add: type === CARD_TYPE.ADD })}
      to={type === CARD_TYPE.ADD ? "#" : `${INTERNAL_LINKS.BLOGS}/${id}`}
      onClick={onAdd ? () => onAdd() : () => {}}
    >
      {type === CARD_TYPE.ADD ? (
        <div className="blog-card-container">
          <IconPlus />
        </div>
      ) : (
        <>
          <div className="blog-card-header">
            {image ? (
              <img src={image} alt={title || "cover image"} />
            ) : (
              <div className="blog-card-header-default" />
            )}
          </div>
          <div className="blog-card-content">
            <h3 className="blog-card-title">{title}</h3>
            <div className="d-flex items-center">
              <div
                className="blog-card-content-description"
                dangerouslySetInnerHTML={{ __html: description.html }}
              />
            </div>
            <div className="blog-card-content-categories">
              {(categories || []).map((item, index) => {
                const category = allCategories.find(
                  (cat) => cat.value === item
                );
                return (
                  <SpecialtyItem
                    key={index}
                    title={category ? category.title : item}
                    active={false}
                  />
                );
              })}
            </div>

            <div className="blog-card-content-date">
              <span>{moment(date).format("MM/DD/YYYY")}</span>
            </div>

            {isOwner && (
              <CardMenu
                menus={CARD_MENUS.slice(0, 2)}
                onClick={(option) => onMenuClick(option, id)}
              >
                <div className="library-card-menu">
                  <img src={IconMenu} alt="icon-menu" />
                </div>
              </CardMenu>
            )}
          </div>
        </>
      )}
    </Link>
  );
};

BlogCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.object,
  image: PropTypes.string,
  categories: PropTypes.array,
  type: PropTypes.string,
  onAdd: PropTypes.func,
  date: PropTypes.func,
  isOwner: PropTypes.bool,
  onMenuClick: PropTypes.func,
};

BlogCard.defaultProps = {
  title: "",
  description: {},
  type: CARD_TYPE.VIEW,
  onAdd: () => {},
  categories: [],
  isOwner: false,
  date: `${moment()}`,
  onMenuClick: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(BlogCard);
