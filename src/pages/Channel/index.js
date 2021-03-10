import React, { useState } from 'react';
import ChannelFilterPanel from "./ChannelFilterPanel";
import { Tabs, CustomButton } from "components";
import ResourcesList from './ResourcesList';
import PodcastsList from './PodcastsList';
import VideosList from './VideosList';
import EventsList from './EventsList';

import './style.scss';

const HARDCODED_CHANNEL_DATA = {
  icon: 'https://lab-user-images.s3.us-east-2.amazonaws.com/event/1614872037984.jpeg',
  name: 'Hacking HR',
  description: 'Market deployment gen-z partnership. Handshake entrepreneur analytics startup bootstrapping gen-z focus graphical user interface interaction design business-to-business metrics. A/B',
  resources: [
    {
      "id":17,
      "title":"Event 1.29.01",
      "link":"https://https://lift.co",
      "description":"Hello\nHow are you?",
      "topics":["agility","culture"],
      "contentType":"article",
      "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
      "image2":null,
      "language":null,
      "recommended":false,
      "approvalStatus":"approved",
      "createdAt":"2021-01-30T04:26:29.487Z","updatedAt":"2021-01-31T00:30:33.176Z"
    },
    {
      "id":14,
      "title":"Bay area job seekers and recruiters - Video conference",
      "link":"https://lift.co",
      "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
      "topics":["recruiting"],
      "contentType":"article",
      "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1610934661839.jpeg",
      "image2":null,
      "language":null,
      "recommended":true,
      "approvalStatus":"approved",
      "createdAt":"2021-01-18T01:51:02.001Z",
      "updatedAt":"2021-01-31T00:27:45.123Z"
    },
  ],
  podcasts: [
    {
      "id":3,
      "title":"Podcast 2",
      "description":"Description",
      "order":1000,
      "imageUrl":null,
      "dateEpisode":"2021-02-10",
      "vimeoLink":"https://vimeo.link",
      "anchorLink":"https://Anchor.link",
      "appleLink":null,
      "googleLink":null,
      "breakerLink":null,
      "pocketLink":null,
      "radioPublicLink":null,
      "spotifyLink":null,
      "iHeartRadioLink":null,
      "topics":null,
      "contentType":"podcast",
      "createdAt":"2021-02-10T16:12:59.243Z",
      "updatedAt":"2021-02-10T16:12:59.243Z"
    },
    {
      "id":1,
      "title":"Episode Test 1",
      "description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      "order":1,
      "imageUrl":"https://lab-user-images.s3.us-east-2.amazonaws.com/podcast/1612573106082.jpeg",
      "dateEpisode":"2021-02-06",
      "vimeoLink":"http://www.google.com/",
      "anchorLink":"http://www.google.com/",
      "appleLink":"http://www.google.com/",
      "googleLink":"http://www.google.com/",
      "breakerLink":"http://www.google.com/",
      "pocketLink":"http://www.google.com/",
      "radioPublicLink":"http://www.google.com/",
      "spotifyLink":"http://www.google.com/",
      "iHeartRadioLink":"http://www.google.com/",
      "topics":["culture","employee-experience-and-engagement","future-of-work"],
      "contentType":"podcast",
      "createdAt":"2021-02-06T00:57:53.560Z",
      "updatedAt":"2021-02-06T00:58:26.414Z"
    },
    {
      "id":4,
      "title":"podcast 5",
      "description":"qweqwe",
      "order":1,
      "imageUrl":null,
      "dateEpisode":"2021-02-10",
      "vimeoLink":"https://vimeo.link",
      "anchorLink":"https://Anchor.link",
      "appleLink":null,
      "googleLink":null,
      "breakerLink":null,
      "pocketLink":null,
      "radioPublicLink":null,
      "spotifyLink":null,
      "iHeartRadioLink":null,
      "topics":["design-thinking","diversity-equity-inclusion-belonging","future-of-work"],
      "contentType":"podcast",
      "createdAt":"2021-02-10T16:45:08.361Z",
      "updatedAt":"2021-02-10T16:45:08.361Z"
    },
  ],
  videos: [

  ],
  events:[
    {
      "id":49,
      "title":"30 organizer 1",
      "organizer":"organizer",
      "startDate":"2021-03-01T09:26:00Z",
      "endDate":"2021-03-01T13:00:00Z",
      "date": "2020.12.30 4:00 am",
      "timezone":"Eastern Standard Time",
      "categories":["agility"],
      "ticket":"free",
      "type":null,
      "location":null,
      "description":null,
      "link":null,
      "credit":null,
      "code":"915764",
      "image":null,
      "image2":null,
      "status":{"2":"going"},
      "users":[2],
      "isOverEmailSent":true,
      "publicLink":"https://community-education.herokuapp.com/49",
      "organizerEmail":"goldenstar007.dev@gmail.com",
      "createdAt":"2021-03-01T08:55:10.592Z",
      "updatedAt":"2021-03-01T10:25:01.148Z"
    },
    {
      "id":15,
      "title":"Event 1.30.1",
      "organizer":"organizer",
      "startDate":"2021-01-30T09:00:00Z",
      "endDate":"2021-01-30T10:00:00Z",
      "date": "2020.11.22 4:00 am",
      "timezone":"Eastern Standard Time",
      "categories":["agility","design-thinking","diversity-equity-inclusion-belonging"],
      "ticket":"free",
      "type":["workshop","panel"],
      "location":["online"],
      "description":{"blocks":[{"key":"6ocdg","text":"How are you?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"BOLD"},{"offset":0,"length":12,"style":"fontsize-18"}],"entityRanges":[],"data":{}},{"key":"2gs9h","text":"I am good, thank you.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"fontsize-12"}],"entityRanges":[],"data":{}}],"entityMap":{}},
      "link":"https://lift.co",
      "credit":{"HRCI":{"selected":false,"money":0},
      "SHRM":{"selected":false,"money":0}},
      "code":"123",
      "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/event/1612117863162.jpeg",
      "image2":"https://lab-user-images.s3.us-east-2.amazonaws.com/event/1612117863567.jpeg",
      "status":{"3":"going"},
      "users":[3],
      "isOverEmailSent":true,
      "publicLink":"https://community-education.herokuapp.com/public-event/15",
      "organizerEmail":"",
      "createdAt":"2021-01-30T08:51:50.544Z",
      "updatedAt":"2021-01-31T18:31:03.704Z"
    },
    {
      "id":48,
      "title":"2 organizer 1",
      "organizer":"organizer",
      "startDate":"2021-03-01T10:54:00Z",
      "endDate":"2021-03-01T11:00:00Z",
      "date": "2020.10.20 4:00 am",
      "timezone":"Eastern Standard Time",
      "categories":["agility"],
      "ticket":"free",
      "type":["presentation"],
      "location":["online"],
      "description":null,
      "link":"https://lift.co",
      "credit":null,
      "code":"803471",
      "image":null,
      "image2":null,
      "status":{"2":"going"},
      "users":[2],
      "isOverEmailSent":true,
      "publicLink":"https://community-education.herokuapp.com/48",
      "organizerEmail":"goldenstar007.dev@gmail.com",
      "createdAt":"2021-03-01T08:53:09.268Z",
      "updatedAt":"2021-03-01T11:25:01.627Z"
    },
  ],
};

function Channel() {
  const [channelData] = useState(HARDCODED_CHANNEL_DATA);
  const [currentTab, setCurrentTab] = useState('0');

  function onFilterChange(filter) {
    console.log('Filter Change', filter);
  }

  function followChannel() {
    console.log('Follow Channel');
  }

  const TabData = [
    {
      title: "Resources",
      content: () => (
        <ResourcesList resources={channelData.resources} />
      ),
    },
    {
      title: "Podcasts",
      content: () => (
        <PodcastsList podcasts={channelData.podcasts} />
      ),
    },
    {
      title: "Videos",
      content: () => (
        <VideosList videos={channelData.videos} />
      ),
    },
    {
      title: "Events",
      content: () => (
        <EventsList events={channelData.events} />
      ),
    },
  ];

  return (
    <div className="channel-page">
      <ChannelFilterPanel onChange={onFilterChange} />
      <div className="channel-page__container">
        <div className="channel-page__results">
          <div className="channel-page__row">
            <div className="channel-page__info-column">
              <div style={{ textAlign: 'center' }}>
                <CustomButton
                  htmlType="button"
                  text="Follow Channel"
                  type="primary"
                  size="md"
                  onClick={followChannel}
                />
              </div>

              <span
                className="channel-info__icon"
                style={{
                  backgroundImage: `url(${channelData.icon})`
                }}
              ></span>

              <div className="channel-info__general-info">
                <h3 className="channel-info__name text-center">
                  {channelData.name}
                </h3>

                <p className="channel-info__description text-center">
                  {channelData.description}
                </p>
              </div>
            </div>
            <div className="channel-page__content">
              <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel;
