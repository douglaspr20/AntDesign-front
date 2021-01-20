import React, {useState, useEffect} from 'react';
import moment from 'moment';

import PodcastForm from "containers/PodcastForm";
import { get, post, put } from "api/module/podcast";

import './style.scss';

function PodcastAdminPage({ history, match }) {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPodcast();
  }, []);

  const getPodcast = async () => {
    if(match.params.id){
      let response = await get(match.params);
      if(response.data.podcast.dateEpisode !== null){
        response.data.podcast.dateEpisode = moment(response.data.podcast.dateEpisode);
      }
      setPodcast(response.data.podcast);
    } else {
      setPodcast({});
    }
  }

  const save = async (data) => {
    setLoading(true);
    let response = null;
    if(match.params.id){
      response = await put({...data, id: match.params.id});
    } else {
      response = await post(data);
    }
    setLoading(false);
    if([200, 201, 204].indexOf(response.status) > -1){
      history.push('/podcast');
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
          podcast && <PodcastForm loading={loading} initialValues={podcast} onFinish={(data) => { save(data) }} />
        }
      </div>
    </div>
  );
}

export default PodcastAdminPage;
