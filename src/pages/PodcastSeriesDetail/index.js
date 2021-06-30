import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { notification } from "antd";

import { EpisodeCard, CustomButton } from "components";
import { INTERNAL_LINKS } from "enum";
import { podcastSelector } from "redux/selectors/podcastSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import {
  getPodcastSeries,
  claimPodcastSeries,
} from "redux/actions/podcast-actions";
import getPodcastLinks from "utils/getPodcastLinks";
import PodcastClaimModal from "./PodcastClaimModal";

import IconBack from "images/icon-back.svg";

import "./style.scss";

const PodcastSeriesDetail = ({
  userProfile,
  match,
  podcastSeries,
  getPodcastSeries,
  claimPodcastSeries,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onClaimCredits = () => {
    setModalVisible(true);
  };

  const onHRClaimOffered = () => {
    claimPodcastSeries(podcastSeries.id, (err) => {
      if (err) {
        notification.error({
          message: "Error",
          description: (err || {}).msg,
        });
      } else {
        notification.info({
          message: "Email was send successfully.",
        });
        setModalVisible(false);
      }
    });
  };

  useEffect(() => {
    if (match.params.id) {
      getPodcastSeries(match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="podcast-series-detail">
      <Link to={INTERNAL_LINKS.PODCAST_SERIES}>
        <div className="podcast-series-detail-back">
          <div className="podcast-series-detail-back-img">
            <img src={IconBack} alt="icon-back" />
          </div>
          <h4>Back to Podcast Series</h4>
        </div>
      </Link>
      <h5 className="podcast-series-detail-label">Title</h5>
      <h3 className="podcast-series-detail-value">
        {podcastSeries.title || ""}
      </h3>
      <h5 className="podcast-series-detail-label">Description</h5>
      <h3 className="podcast-series-detail-value">
        {podcastSeries.description || ""}
      </h3>
      <h5 className="podcast-series-detail-label">Learning Objectives</h5>
      <h3 className="podcast-series-detail-value">
        {podcastSeries.objectives || ""}
      </h3>
      <h5 className="podcast-series-detail-label">Duration</h5>
      <h3 className="podcast-series-detail-value">
        {podcastSeries.duration || ""}
      </h3>
      <h5 className="podcast-series-detail-label">HR Credit offered</h5>
      <h3 className="podcast-series-detail-value">
        {podcastSeries.hrCreditOffered || ""}
      </h3>
      <div className="podcast-series-detail-list">
        {(podcastSeries.podcasts || []).map((podcast) => (
          <EpisodeCard
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            created_at={moment(podcast.dateEpisode)}
            episode_number={podcast.order}
            episode_cover={podcast.imageUrl}
            categories={podcast.topics}
            links={getPodcastLinks(podcast)}
          />
        ))}
      </div>
      {userProfile && userProfile.memberShip === "premium" && (
        <div className="d-flex justify-center">
          <CustomButton
            type="primary"
            text="Claim HR Credits"
            onClick={onClaimCredits}
          />
        </div>
      )}
      <PodcastClaimModal
        visible={modalVisible}
        title="HR Credit Offered"
        destroyOnClose={true}
        subTitle={podcastSeries.title}
        onClaim={onHRClaimOffered}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  podcastSeries: podcastSelector(state).podcastSeries,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getPodcastSeries,
  claimPodcastSeries,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastSeriesDetail);
