import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { ConferenceCard,EpisodeCard } from "components";

import {
  getConferenceLibrary,
  setConferenceLibrary,
} from "redux/actions/conference-actions";
import { getPodcast, setPodcast } from "redux/actions/podcast-actions";
import { conferenceSelector } from "redux/selectors/conferenceSelector";
import { podcastSelector } from "redux/selectors/podcastSelector";

import getPodcastLinks from "utils/getPodcastLinks.js";

import "./style.scss";

const LibraryItemPage = ({
  getConferenceLibrary,
  setConferenceLibrary,
  getPodcast,
  setPodcast,
  conferenceLibrary,
  podcast,
  match,
}) => {
  const [id] = useState(match.params.id);
  const [type] = useState(match.params.type);

  useEffect(() => {
    if (type === "conference-library") {
      setConferenceLibrary(null);
      getConferenceLibrary(id);
    } else if (type === "podcast") {
      setPodcast(null);
      getPodcast(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="library-item-page-container">
      {type === "conference-library" && (
        <div className="library-item-page-container--conference-library">
          {conferenceLibrary != null && (
            <ConferenceCard
              key={0}
              data={conferenceLibrary}
              afterUpdate={() => {
                getConferenceLibrary(id);
              }}
              isInternalLink={true}
            />
          )}
        </div>
      )}
      {type === "podcast" && (
        <div className="library-item-page-container--podcast-library">
          {podcast != null && (
            <EpisodeCard
              id={podcast.id}
              title={podcast.title}
              created_at={moment(podcast.dateEpisode)}
              episode_number={podcast.order}
              episode_cover={podcast.imageUrl}
              categories={podcast.topics}
              links={getPodcastLinks(podcast)}
              episode={podcast}
              isInternalLink={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

LibraryItemPage.propTypes = {
  title: PropTypes.string,
};

LibraryItemPage.defaultProps = {
  title: "",
};

const mapStateToProps = (state, props) => ({
  conferenceLibrary: conferenceSelector(state).conferenceLibrary,
  podcast: podcastSelector(state).podcast,
});

const mapDispatchToProps = {
  getConferenceLibrary,
  setConferenceLibrary,
  getPodcast,
  setPodcast,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryItemPage);
