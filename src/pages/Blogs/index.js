import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { blogPostSelector } from "redux/selectors/blogPostSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import { getAllBlogPosts } from "redux/actions/blog-post-action";
import BlogsFilterPanel from "./BlogsFilterPanel";
import FilterDrawer from "./FilterDrawer";
import BlogCard from "components/BlogCard";

import { numberWithCommas } from "utils/format";

import "./style.scss";

const Blogs = ({ allBlogsPost, getAllBlogPosts }) => {
  const [filters, setFilters] = useState({});

  const onFilterChange = (filter) => {
    setFilters(filter);
    // getFirstChannelList({ filter });
  };

  useEffect(() => {
    getAllBlogPosts();
  }, [getAllBlogPosts]);

  return (
    <div className="blogs-page">
      <BlogsFilterPanel onChange={onFilterChange} />
      <FilterDrawer onChange={onFilterChange} />

      <div className="blogs-page__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3
                  className="filters-btn"
                  // onClick={() => showFilterPanel()}
                >
                  Filters
                </h3>
                <h3>
                  {/* {allblogs.length} result
                {allblogs.length > 1 ? "s" : ""} */}
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>
                  {/* {`${numberWithCommas(countOfResults)} result${
                countOfResults > 1 ? "s" : ""
              }`} */}
                </h3>
              </div>
            </Col>
          </Row>
          <div className="blogs-list">
            {allBlogsPost.map((blogPost) => (
              <BlogCard
                // onMenuClick={handleEditOrDelete}
                // isOwner={isOwner}
                key={blogPost.id}
                id={blogPost.id}
                image={blogPost.imageUrl}
                date={blogPost.createdAt}
                title={blogPost.title}
                description={blogPost.description}
                categories={blogPost.categories}
              />
            ))}
          </div>
          {/* {currentPage * SETTINGS.MAX_SEARCH_ROW_NUM < countOfResults && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="blogs-page-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!loading && (
              <CustomButton
                text="Show more"
                type="primary outlined"
                size="lg"
                onClick={onShowMore}
              />
            )}
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  allBlogsPost: blogPostSelector(state).allBlogsPost,
});

const mapDispatchToProps = {
  getAllBlogPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
