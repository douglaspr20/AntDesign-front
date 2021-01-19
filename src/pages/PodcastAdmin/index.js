import React, {useState, useEffect} from 'react';
import moment from 'moment';

import PodcastForm from "containers/PodcastForm";
import { get, post, put } from "api/module/podcast";

import './style.scss';

function PodcastAdminPage({ match }) {
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    getPodcast();
  }, []);

  const getPodcast = async () => {
    if(match.params.id){
      let response = await get(match.params);
      if(response.data.podcast.dateEpisode !== null){
        console.log(response.data.podcast.dateEpisode);
        response.data.podcast.dateEpisode = moment(response.data.podcast.dateEpisode);
      }
      setPodcast(response.data.podcast);
    } else {
      setPodcast({});
    }
  }

  const save = async (data) => {
    if(match.params.id){
      await put({...data, id: match.params.id});
    } else {
      await post(data);
    }
  }
  return (
    <div className="podcast-page">
      <div className="podcast-page__container">
        <header className="podcast-page__header">
          <h2>
            Podcats Form
          </h2>
        </header>
        {
          podcast && <PodcastForm initialValues={podcast} onFinish={(data) => { save(data) }} />
        }
      </div>
    </div>
  );
}

export default PodcastAdminPage;
