import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Spin } from "antd";
import OpengraphReactComponent from "opengraph-react";

import {
  getCouncilResources,
  getCouncilResourceById,
} from "redux/actions/council-actions";
import { getAllCouncilComments } from "redux/actions/council-comments-actions";

import { councilSelector } from "redux/selectors/councilSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import { authSelector } from "redux/selectors/authSelector";
import { councilCommentsSelector } from "redux/selectors/councilCommentsSelector";

import { INTERNAL_LINKS } from "enum";

import CouncilComment from "components/CouncilComment";
import IconBack from "images/icon-back.svg";
import CouncilCommentForm from "containers/CouncilCommentForm.js";

import "./style.scss";

const CouncilConversationsCard = ({
  councilResource,
  getCouncilResourceById,
  getAllCouncilComments,
  allComments,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  useEffect(() => {
    getCouncilResourceById(id);
    getAllCouncilComments({ councilId: id });
  }, [getCouncilResourceById, getAllCouncilComments, id]);

  return (
    <div className="post-card-container-council">
      <div
        key={`custom-post-card-council${councilResource?.id}`}
        className={`custom-post-card-council`}
      >
        <div
          className="skill-cohort-detail-page-header-content-back-btn"
          onClick={() => history.push(INTERNAL_LINKS.COUNCIL)}
        >
          <div className="skill-cohort-detail-page-header-content-back backToList">
            <div className="skill-cohort-detail-page-header-content-back-img">
              <img src={IconBack} alt="icon-back" />
            </div>
            <h4>Back to List</h4>
          </div>
        </div>
        <section className="custom-post-card--header" >
          <section className="custom-post-card-council--content">
            <div className="custom-image">
              <OpengraphReactComponent
                site={councilResource?.link}
                appId={process.env.REACT_APP_OPENGRAPH_KEY}
                loader={<Spin></Spin>}
                size={"large"}
                acceptLang="auto"
              />
            </div>
            <div className="custom-comment-card-container">
              <CouncilCommentForm />
              <div>
                {allComments?.map((item) => (
                  <CouncilComment data={item} />
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

CouncilConversationsCard.propTypes = {
  showEdit: PropTypes.bool,
  generalFooter: PropTypes.bool,
  onCommentClick: PropTypes.func,
  afterRemove: PropTypes.func,
  details: PropTypes.bool,
};

CouncilConversationsCard.defaultProps = {
  showEdit: false,
  generalFooter: true,
  onCommentClick: () => {},
  afterRemove: () => {},
  details: false,
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  councilResources: councilSelector(state).councilResources,
  councilResource: councilSelector(state).councilResource,
  allComments: councilCommentsSelector(state).allComments,
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  getCouncilResources,
  getCouncilResourceById,
  getAllCouncilComments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouncilConversationsCard);
