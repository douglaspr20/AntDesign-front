import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SpeakersContainer from "../Conference2023Speakers/SpeakersContainer/index.js";
import Agenda from "../Conference2023Agenda/Agenda/index.js";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import SponsorsContainer from "../Conference2023Sponsors/SponsorsContainer";

import "./style.scss";

const Conference2023Home = () => {

  return (
    <>
      <div className="container-conference" style={{marginTop: "90px"}}>
        <div className="imagen-conference">
        </div>
        <div className="container-content-picture">
          <p className="parrafo-hachinglab-picture">Hacking HR Conference</p>
          <p className="title-hachinglab-picture1">People <span>Analytics</span></p>
          <p className="title-hachinglab-picture2">Global Summit and Bootcamp</p>
          <p className="date-picture">Nov 2022 | New York, NY</p>
        </div>
        <div className="container-speaker-home">
          <p className="p-speakers">{'Special Guests & Speakers'}</p>
          <SpeakersContainer maxLength={4} type={'home'}/>
          <Link style={{textDecoration: "none"}} to={INTERNAL_LINKS.CONFERENCE_2023 + "/speakers"}>
            <button className="button-speakers-home">
              View All Speakers
            </button>
          </Link>
        </div>
        <div className="container-agenda-home">
          <p className="p-agenda">Agenda</p>
          <Agenda maxLength={3}/>
          <Link style={{textDecoration: "none"}} to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}>
            <button className="button-agenda-home">
              View All Conference schedule
            </button>
          </Link>
        </div>
        <div className="container-publicity">
          <p className="p-publicity">{'Past Conferences & Resources'}</p>
          <div className="container-data">
            <div className="picture-video">
              <div className="play-picture"></div>
              <div className="gradient-picture"></div>
              <p className="p-picture-publicity">People Conference, Seminar March, 2022</p>
            </div>
            <div className="container-information">
              <div className="picture-information"></div>
              <div className="container-text-information">
                <p className="title-information">Proud to be part of Hacking HR Community</p>
                <p className="description-information">with learning, community and collaboration. We are a community of business and HR leaders, HR practitioners, technologists, entrepreneurs, consultants.</p>
                <p className="link-information">See Video</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-sponsors">
          <p className="p-sponsors">Sponsored <span>by</span></p>
          <SponsorsContainer maxLength={4} />
          <Link style={{textDecoration: "none"}} to={INTERNAL_LINKS.CONFERENCE_2023 + "/sponsors"}>
            <button className="button-sponsor-home">
              See all of the sponsors
            </button>
          </Link>
        </div>
        <div className="footer-home">
          <div className="logo-footer"></div>
          <div className="container-link-footer">
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/speakers"}>
              <p className="p-link-footer" style={{marginRight: "50px"}}>Speakers</p>
            </Link>
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/sponsors"}>
              <p className="p-link-footer" style={{marginRight: "50px"}}>Sponsors</p>
            </Link>
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}>
              <p className="p-link-footer" style={{marginRight: "50px"}}>Agenda</p>
            </Link>
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}>
              <p className="p-link-footer">In-Person Experience</p>
            </Link>
          </div>
          <p className="reserved">© 2022 All Rights Reserved</p>
        </div>
      </div>
    </>
  );
  };

  Conference2023Home.propTypes = {
    title: PropTypes.string,
  };
  
  Conference2023Home.defaultProps = {
    title: "",
  };
  
  const mapStateToProps = (state, props) => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Home);