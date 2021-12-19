import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./style.scss";

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + Math.round(s);
}

function MicroConferenceVideosList({ list, setActiveVideoId, activeVideoId }) {
  useEffect(() => {
    if (activeVideoId === null && list.length > 0) {
      setActiveVideoId(list[0].id);
    }
  }, [activeVideoId, list, setActiveVideoId]);

  return (
    <div className="micro-conference__videos-list">
      <div className="micro-conference__videos-list-inner">
        {list.map((item) => {
          return (
            <button
              key={item.id}
              className={`
              micro-conference__videos-list-button
              ${
                activeVideoId === item.id
                  ? "micro-conference__videos-list-button--active"
                  : ""
              }
            `}
              onClick={() => setActiveVideoId(item.id)}
            >
              <span className="micro-conference__videos-list-button-indicator"></span>
              <span className="micro-conference__videos-list-button-title">
                {item.title}
              </span>
              <span className="micro-conference__videos-list-button-duration">
                {fmtMSS(item.duration)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

MicroConferenceVideosList.propTypes = {
  list: PropTypes.array,
  setActiveVideoId: PropTypes.func,
  activeVideoId: PropTypes.number,
};

MicroConferenceVideosList.defaultProps = {
  list: [],
  setActiveVideoId: () => {},
  activeVideoId: null,
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroConferenceVideosList);
