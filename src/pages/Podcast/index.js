import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import moment from "moment";
import { connect } from "react-redux";

import { getAllPodcasts } from "redux/actions/podcast-actions";
import { podcastSelector } from "redux/selectors/podcastSelector";

import EpisodeCard from "./EpisodeCard";

import IconAnchorFm from "images/icon-anchor-fm.svg";
import IconApplePodcast from "images/icon-apple-podcast.svg";
import IconBreakerPodcast from "images/icon-breaker-podcast.svg";
import IconIheartradio from "images/icon-iheartradio.svg";
import IconPocketCasts from "images/icon-pocket-casts.svg";
import IconRadiopublic from "images/icon-radiopublic.svg";
import IconSpotify from "images/icon-spotify.svg";
import IconVimeo from "images/icon-vimeo.svg";

import "./style.scss";

const HARDCODED_LIST_OF_PODCAST_HOSTS = {
  anchor: {
    icon: IconAnchorFm,
    label: "Anchor FM",
    link:
      "https://anchor.fm/hacking-hr/episodes/The-Hacking-HR-Podcast---Episode-1-ei2cak",
  },

  apple: {
    icon: IconApplePodcast,
    label: "Apple Podcasts",
    link:
      "https://podcasts.apple.com/us/podcast/the-hacking-hr-podcast/id1527651839?uo=4",
  },

  breaker: {
    icon: IconBreakerPodcast,
    label: "Breaker",
    link: "https://www.breaker.audio/the-hacking-hr-podcast",
  },

  iHeart: {
    icon: IconIheartradio,
    label: "iHeart Radio",
    link: "https://www.iheart.com/podcast/269-the-hacking-hr-podcast-70571765/",
  },

  pocketCasts: {
    icon: IconPocketCasts,
    label: "Pocket Casts",
    link: "https://pca.st/ydlfya8v",
  },

  radioPublic: {
    icon: IconRadiopublic,
    label: "Radio Public",
    link: "https://radiopublic.com/the-hacking-hr-podcast-GOKyBz",
  },

  spotify: {
    icon: IconSpotify,
    label: "Spotify",
    link: "https://open.spotify.com/show/1Vgm72AyxLwQplesLQv0TN",
  },

  vimeo: {
    icon: IconVimeo,
    label: "Vimeo",
    link: "https://vimeo.com/hackinghr",
  },
};

const PodcastPage = ({ allEpisodes, getAllPodcasts }) => {
  const [podcastHosts] = useState(HARDCODED_LIST_OF_PODCAST_HOSTS);

  useEffect(() => {
    getAllPodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLinks = (episode) => {
    let links = [];
    if (episode.vimeoLink) {
      links.push({
        icon: IconVimeo,
        label: "Vimeo",
        link: episode.vimeoLink,
      });
    }
    if (episode.anchorLink) {
      links.push({
        icon: IconAnchorFm,
        label: "Anchor FM",
        link: episode.anchorLink,
      });
    }
    if (episode.appleLink) {
      links.push({
        icon: IconApplePodcast,
        label: "Apple Podcasts",
        link: episode.appleLink,
      });
    }
    if (episode.breakerLink) {
      links.push({
        icon: IconBreakerPodcast,
        label: "Breaker",
        link: episode.breakerLink,
      });
    }
    if (episode.pocketLink) {
      links.push({
        icon: IconPocketCasts,
        label: "Pocket Casts",
        link: episode.pocketLink,
      });
    }
    if (episode.radioPublicLink) {
      links.push({
        icon: IconRadiopublic,
        label: "Radio Public",
        link: episode.radioPublicLink,
      });
    }
    if (episode.spotifyLink) {
      links.push({
        icon: IconSpotify,
        label: "Spotify",
        link: episode.spotifyLink,
      });
    }
    if (episode.iHeartRadioLink) {
      links.push({
        icon: IconIheartradio,
        label: "iHeart Radio",
        link: episode.iHeartRadioLink,
      });
    }
    return links;
  };

  return (
    <div className="podcast-page">
      <div className="podcast-page__container">
        <header className="podcast-page__header">
          <h2>Subscribe:</h2>
        </header>

        <section className="podcast-page__hosts-row">
          {Object.values(podcastHosts).map((host, i) => (
            <div className="podcast-page__hosts-col" key={i}>
              <Tooltip placement="top" title={host.label}>
                <a
                  href={host.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="podcast-page__host-link"
                  atia-label={`Link to ${host.label}`}
                >
                  <span
                    className="podcast-page__host-link-icon"
                    style={{
                      backgroundImage: `url(${host.icon})`,
                    }}
                  ></span>
                  <span className="podcast-page__host-link-label">
                    {host.label}
                  </span>
                </a>
              </Tooltip>
            </div>
          ))}
        </section>

        <header className="podcast-page__header">
          <h2>Latest podcasts:</h2>
        </header>

        <section className="podcast-page__episodes-row">
          {allEpisodes.map((episode) => {
            return (
              <div className="podcast-page__episodes-col" key={episode.id}>
                <EpisodeCard
                  id={episode.id}
                  created_at={moment(episode.dateEpisode)}
                  episode_number={episode.order}
                  episode_cover={episode.imageUrl}
                  links={getLinks(episode)}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allEpisodes: podcastSelector(state).allEpisodes,
});

const mapDispatchToProps = {
  getAllPodcasts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastPage);