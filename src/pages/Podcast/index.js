import React, { useState } from 'react';
import { Tooltip, } from 'antd';
import EpisodeCard from './EpisodeCard';
import generateId from 'utils/generateId.js';

import IconAnchorFm from 'images/icon-anchor-fm.svg';
import IconApplePodcast from 'images/icon-apple-podcast.svg';
import IconBreakerPodcast from 'images/icon-breaker-podcast.svg';
import IconIheartradio from 'images/icon-iheartradio.svg';
import IconPocketCasts from 'images/icon-pocket-casts.svg';
import IconRadiopublic from 'images/icon-radiopublic.svg';
import IconSpotify from 'images/icon-spotify.svg';
import IconVimeo from 'images/icon-vimeo.svg';

import './style.scss';

const HARDCODED_LIST_OF_PODCAST_HOSTS = {
  anchor: {
    icon: IconAnchorFm,
    label: 'Anchor FM',
    link: 'https://anchor.fm/hacking-hr/episodes/The-Hacking-HR-Podcast---Episode-1-ei2cak',
  },

  apple: {
    icon: IconApplePodcast,
    label: 'Apple Podcasts',
    link: 'https://podcasts.apple.com/us/podcast/the-hacking-hr-podcast/id1527651839?uo=4',
  },

  breaker: {
    icon: IconBreakerPodcast,
    label: 'Breaker',
    link: 'https://www.breaker.audio/the-hacking-hr-podcast',
  },

  iHeart: {
    icon: IconIheartradio,
    label: 'iHeart Radio',
    link: 'https://www.iheart.com/podcast/269-the-hacking-hr-podcast-70571765/',
  },

  pocketCasts: {
    icon: IconPocketCasts,
    label: 'Pocket Casts',
    link: 'https://pca.st/ydlfya8v',
  },

  radioPublic: {
    icon: IconRadiopublic,
    label: 'Radio Public',
    link: 'https://radiopublic.com/the-hacking-hr-podcast-GOKyBz',
  },

  spotify: {
    icon: IconSpotify,
    label: 'Spotify',
    link: 'https://open.spotify.com/show/1Vgm72AyxLwQplesLQv0TN',
  },

  vimeo: {
    icon: IconVimeo,
    label: 'Vimeo',
    link: 'https://vimeo.com/hackinghr',
  },
}

const HARDCODED_LIST_OF_EPISODES = [
  {
    id: generateId(20),
    created_at: new Date('10/5/20'),
    episode_number: 999,
    episode_cover: '',
    links: [
      {
        icon: IconAnchorFm,
        label: 'Anchor FM',
        link: 'https://anchor.fm/hacking-hr/episodes/The-Hacking-HR-Podcast---Episode-1-ei2cak',
      },
      { 
        icon: IconVimeo,
        label: 'Vimeo',
        link: 'https://vimeo.com/hackinghr',
      },
      {
        icon: IconApplePodcast,
        label: 'Apple Podcasts',
        link: 'https://podcasts.apple.com/us/podcast/the-hacking-hr-podcast/id1527651839?uo=4',
      },
    ],
  },

  {
    id: generateId(20),
    created_at: new Date('9/5/20'),
    episode_number: 998,
    episode_cover: '',
    links: [
      {
        icon: IconBreakerPodcast,
        label: 'Breaker',
        link: 'https://www.breaker.audio/the-hacking-hr-podcast',
      },
      { 
        icon: IconVimeo,
        label: 'Vimeo',
        link: 'https://vimeo.com/hackinghr',
      },
    ],
  },

  {
    id: generateId(20),
    created_at: new Date('8/5/20'),
    episode_number: 997,
    episode_cover: '',
    links: [
      {
        icon: IconAnchorFm,
        label: 'Anchor FM',
        link: 'https://anchor.fm/hacking-hr/episodes/The-Hacking-HR-Podcast---Episode-1-ei2cak',
      },
      {
        icon: IconPocketCasts,
        label: 'Pocket Casts',
        link: 'https://pca.st/ydlfya8v',
      },
      {
        icon: IconIheartradio,
        label: 'iHeart Radio',
        link: 'https://www.iheart.com/podcast/269-the-hacking-hr-podcast-70571765/',
      },
      {
        icon: IconSpotify,
        label: 'Spotify',
        link: 'https://open.spotify.com/show/1Vgm72AyxLwQplesLQv0TN',
      },
    ],
  },

  {
    id: generateId(20),
    created_at: new Date('7/5/20'),
    episode_number: 996,
    episode_cover: '',
    links: [
      {
        icon: IconIheartradio,
        label: 'iHeart Radio',
        link: 'https://www.iheart.com/podcast/269-the-hacking-hr-podcast-70571765/',
      },
      { 
        icon: IconVimeo,
        label: 'Vimeo',
        link: 'https://vimeo.com/hackinghr',
      },
    ],
  },

  {
    id: generateId(20),
    created_at: new Date('6/5/20'),
    episode_number: 995,
    episode_cover: '',
    links: [
      {
        icon: IconAnchorFm,
        label: 'Anchor FM',
        link: 'https://anchor.fm/hacking-hr/episodes/The-Hacking-HR-Podcast---Episode-1-ei2cak',
      },
      {
        icon: IconApplePodcast,
        label: 'Apple Podcasts',
        link: 'https://podcasts.apple.com/us/podcast/the-hacking-hr-podcast/id1527651839?uo=4',
      },
      {
        icon: IconBreakerPodcast,
        label: 'Breaker',
        link: 'https://www.breaker.audio/the-hacking-hr-podcast',
      },
      {
        icon: IconIheartradio,
        label: 'iHeart Radio',
        link: 'https://www.iheart.com/podcast/269-the-hacking-hr-podcast-70571765/',
      },
      {
        icon: IconPocketCasts,
        label: 'Pocket Casts',
        link: 'https://pca.st/ydlfya8v',
      },
      {
        icon: IconRadiopublic,
        label: 'Radio Public',
        link: 'https://radiopublic.com/the-hacking-hr-podcast-GOKyBz',
      },
      {
        icon: IconSpotify,
        label: 'Spotify',
        link: 'https://open.spotify.com/show/1Vgm72AyxLwQplesLQv0TN',
      },
      {
        icon: IconVimeo,
        label: 'Vimeo',
        link: 'https://vimeo.com/hackinghr',
      },
    ],
  },
];

function PodcastPage() {
  const [podcastHosts] = useState(HARDCODED_LIST_OF_PODCAST_HOSTS);
  const [episodes] = useState(HARDCODED_LIST_OF_EPISODES);

  return (
    <div className="podcast-page">
      <div className="podcast-page__container">
        <header className="podcast-page__header">
          <h2>
            Subscribe:
          </h2>
        </header>

        <section className="podcast-page__hosts-row">
          {Object.values(podcastHosts).map((host, i) => (
            <div className="podcast-page__hosts-col"
              key={i}
            >
              <Tooltip
                placement="top"
                title={host.label}
              >
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
          <h2>
            Latest podcasts:
          </h2>
        </header>

        <section className="podcast-page__episodes-row">
          {episodes.map(episode => (
            <div className="podcast-page__episodes-col"
              key={episode.id}
            >
              <EpisodeCard
                id={episode.id}
                created_at={episode.created_at}
                episode_number={episode.episode_number}
                episode_cover={episode.episode_cover}
                links={episode.links}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default PodcastPage;
