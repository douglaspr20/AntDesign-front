import React, { useState } from 'react';
import ChannelsFilterPanel from "./ChannelsFilterPanel";
import { Row, Col } from "antd";
import { CustomSelect } from "components";
import { SETTINGS } from "enum";
import ChannelCard from './ChannelCard';
import './style.scss';

const SortOptions = SETTINGS.SORT_OPTIONS;
const HARDCODED_CHANNELS_DATA = [
  {
    "id":"17",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-01-30T04:26:29.487Z",
    "updatedAt":"2021-01-31T00:30:33.176Z"
  },
  {
    "id":"14",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit.",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-01-18T01:51:02.001Z",
    "updatedAt":"2021-01-31T00:27:45.123Z"
  },
  {
    "id":"13",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-02-18T01:51:02.001Z",
    "updatedAt":"2021-02-31T00:27:45.123Z"
  },
  {
    "id":"12",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat.",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-03-18T01:51:02.001Z",
    "updatedAt":"2021-03-31T00:27:45.123Z"
  },
  {
    "id":"171",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-01-30T04:26:29.487Z",
    "updatedAt":"2021-01-31T00:30:33.176Z"
  },
  {
    "id":"142",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit.",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-01-18T01:51:02.001Z",
    "updatedAt":"2021-01-31T00:27:45.123Z"
  },
  {
    "id":"133",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-02-18T01:51:02.001Z",
    "updatedAt":"2021-02-31T00:27:45.123Z"
  },
  {
    "id":"124",
    "title":"Bay area job seekers and recruiters - Video conference",
    "description":"Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat.",
    "image":"https://lab-user-images.s3.us-east-2.amazonaws.com/library/1611980789047.jpeg",
    "createdAt":"2021-03-18T01:51:02.001Z",
    "updatedAt":"2021-03-31T00:27:45.123Z"
  },
];

function Channels() {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
  const [channelsList] = useState(HARDCODED_CHANNELS_DATA);

  function onFilterChange(filter) {
    console.log('Filter Change', filter);
  }

  function onSortChange(value) {
    setSortValue(value);
  };

  return (
    <div className="channels-page">
      <ChannelsFilterPanel onChange={onFilterChange} />
      <div className="channels-page__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3 className="filters-btn">
                  Filters
                </h3>
                <h3>{channelsList.length} result{channelsList.length > 1 ? 's' : ''}</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>{channelsList.length} result{channelsList.length > 1 ? 's' : ''}</h3>
                <CustomSelect
                  className="search-results-container-sort"
                  bordered={false}
                  options={SortOptions}
                  value={sortValue}
                  onChange={(value) => onSortChange(value)}
                />
              </div>
            </Col>
          </Row>
          <div className="channels-list">
            {channelsList.map(classItem => (
              <ChannelCard
                key={classItem.id}
                id={classItem.id}
                title={classItem.title}
                description={classItem.description}
                image={classItem.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels;
