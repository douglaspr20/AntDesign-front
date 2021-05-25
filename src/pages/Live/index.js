import React from 'react';
import { Divider } from 'antd';
import ReactPlayer from 'react-player/youtube';
import './style.scss';

const LivePage = () => {
  return (<div className="live-page">
    <div class="live-page--container">
      <div className="live-page--container--videoplayer">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=WGWQnw8uVdY"
          width="100%"
          height="100%"
        />
      </div>
      <div className="live-item">
        <Divider />
        <h2>El en vivo mas importante de la vida!</h2>
      </div>
      <div className="live-item">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut finibus mauris. Curabitur accumsan dolor non massa luctus, quis venenatis dolor lobortis. Cras vel nisl libero. Aliquam nec tempus felis. Nullam consectetur nisl nibh, ut lobortis lorem sodales in. Nulla pellentesque neque eget arcu dignissim, nec sodales arcu vehicula. Suspendisse blandit ornare ullamcorper. Morbi eget justo ipsum. Phasellus rutrum, urna vel venenatis blandit, metus ante gravida ipsum, ac semper purus velit bibendum purus. Nullam a nulla sit amet leo hendrerit rhoncus at vitae velit.</p>
      </div>
    </div>
  </div>);
};

export default LivePage;