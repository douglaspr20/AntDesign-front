import React from 'react';
import PropTypes from 'prop-types';
import NoItemsMessageCard from 'components/NoItemsMessageCard';
import { EpisodeCard } from 'components';
import moment from "moment";
import getPodcastLinks from "utils/getPodcastLinks.js";

function PodcastsList({ podcasts }) {

  return (
    <div className="channel-page__list-wrap">
      {podcasts.length === 0
        ? <NoItemsMessageCard message={'There are no podcasts for you at the moment'} />
        : (
          <div className="channels__list">
            {podcasts.map(episode => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                title={episode.title}
                created_at={moment(episode.dateEpisode)}
                episode_number={episode.order}
                episode_cover={episode.imageUrl}
                categories={episode.topics}
                links={getPodcastLinks(episode)}
              />
            ))}
          </div>
        )
      }
    </div>
  );
}

PodcastsList.propTypes = {
  podcasts: PropTypes.array,
};

PodcastsList.defaultProps = {
  podcasts: [],
};

export default PodcastsList;
