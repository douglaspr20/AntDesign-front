import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ConferenceCard } from "components";

import {
  getConferenceLibrary,
  setConferenceLibrary,
} from "redux/actions/conference-actions";
import { conferenceSelector } from "redux/selectors/conferenceSelector";

import "./style.scss";

const LibraryItemPage = ({
  getConferenceLibrary,
  setConferenceLibrary,
  conferenceLibrary,
  match,
}) => {
  const [id] = useState(match.params.id);
  const [type] = useState(match.params.type);

  useEffect(() => {
    if (type === "conference-library") {
      setConferenceLibrary(null);
      getConferenceLibrary(id);
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
});

const mapDispatchToProps = {
  getConferenceLibrary,
  setConferenceLibrary,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryItemPage);
