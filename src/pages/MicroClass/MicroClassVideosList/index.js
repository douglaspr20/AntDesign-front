import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function fmtMSS(s){
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.round(s);
}

function MicroClassVideosList({ list, setActiveVideoId, activeVideoId }) {

  useEffect(() => {
    if (activeVideoId === null && list.length > 0) {
      setActiveVideoId(list[0].id);
    }
  }, [activeVideoId, list, setActiveVideoId])

  return (
    <div className="micro-class__videos-list">
      <div className="micro-class__videos-list-inner">
        {list.map(item => (
          <button 
            key={item.id}
            className={`
              micro-class__videos-list-button
              ${item.is_watched ? 'micro-class__videos-list-button--watched' : ''}
              ${activeVideoId === item.id ? 'micro-class__videos-list-button--active' : ''}
            `}
            onClick={() => setActiveVideoId(item.id)}
          >
            <span className="micro-class__videos-list-button-indicator"></span>
            <span className="micro-class__videos-list-button-title">
              {item.title}
            </span>
            <span className="micro-class__videos-list-button-duration">
              {fmtMSS(item.duration)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

MicroClassVideosList.propTypes = {
  list: PropTypes.array,
  setActiveVideoId: PropTypes.func,
  activeVideoId: PropTypes.number,
};

MicroClassVideosList.defaultProps = {
  list: [],
  setActiveVideoId: () => {},
  activeVideoId: null,
};

export default MicroClassVideosList;
