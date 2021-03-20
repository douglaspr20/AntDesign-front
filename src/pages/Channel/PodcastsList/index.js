import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import NoItemsMessageCard from "components/NoItemsMessageCard";
import { EpisodeCard } from "components";
import { CARD_TYPE } from "enum";
import getPodcastLinks from "utils/getPodcastLinks.js";

const PodcastsList = ({ podcasts, isOwner }) => {
  const onShowPodcastModal = () => {};

  return (
    <div className="channel-page__list-wrap">
      {!isOwner && podcasts.length === 0 ? (
        <NoItemsMessageCard
          message={"There are no podcasts for you at the moment"}
        />
      ) : (
        <div className="channels__list">
          {isOwner && (
            <EpisodeCard type={CARD_TYPE.ADD} onAdd={onShowPodcastModal} />
          )}
          {podcasts.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              type={isOwner ? CARD_TYPE.EDIT : CARD_TYPE.VIEW}
              title={episode.title}
              created_at={moment(episode.dateEpisode)}
              episode_number={episode.order}
              episode_cover={episode.imageUrl}
              categories={episode.topics}
              links={getPodcastLinks(episode)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

PodcastsList.propTypes = {
  podcasts: PropTypes.array,
  isOwner: PropTypes.bool,
};

PodcastsList.defaultProps = {
  podcasts: [],
  isOwner: false,
};

export default PodcastsList;
