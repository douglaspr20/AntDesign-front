import React, { useEffect } from "react";
import { connect } from "react-redux";
import SpeakersContainer from "../Conference2023Speakers/SpeakersContainer/index.js";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import Agenda from "../Conference2023Agenda/Agenda/index.js";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import { getAllParafs } from "redux/actions/speaker-actions";

import "./style.scss";

const Conference2023Home = ({
  getAllParafs,
  allParrafs
}) => {

  useEffect(() => {
    getAllParafs("Home")
  }, [getAllParafs])

  return (
    <>
      <div className="container-conference" style={{marginTop: "90px"}}>
        <div className="imagen-conference">
          <div className="container-content-picture">
            <p className="parrafo-hachinglab-picture">Hacking HR Presents</p>
            <p className="title-hachinglab-picture1">2023 Global Conference</p>
            <p className="title-hachinglab-picture2"><span className="span-color">FORWARD2023</span></p>
            <p className="date-picture">March 6-9, 2022 | Virtual</p>
          </div>
        </div>
        <div className="container-parraf">
          {allParrafs.map((parraf) => {
            return (
              <div dangerouslySetInnerHTML={{ __html: parraf.text }} ></div>
            )
          })}
        </div>
        <div className="container-speaker-home">
          <p className="p-speakers">Speakers</p>
          <SpeakersContainer maxLength={4} className={"container-users"} />
          <Link style={{textDecoration: "none"}} to={INTERNAL_LINKS.CONFERENCE_2023 + "/speakers"}>
            <button className="button-speakers-home">
              View All Speakers
            </button>
          </Link>
        </div>
        <div className="container-agenda-home">
          <p className="p-agenda">Agenda</p>
          <Agenda maxLength={4} type={"double-collapse"} />
          <Link style={{textDecoration: "none"}} to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}>
            <button className="button-agenda-home">
              View All Conference schedule
            </button>
          </Link>
        </div>
        <div className="container-publicity">
          <p className="p-publicity">{'Past Conferences & Resources'}</p>
          <div className="container-data">
            <Link style={{textDecoration: "none", width: "100%", height: "100%"}} to={INTERNAL_LINKS.CONFERENCE_LIBRARY} target="_blank">
              <div className="picture-video">
                <div className="play-picture"></div>
                <div className="gradient-picture"></div>
                <p className="p-picture-publicity">Past Conferences: 2020 and 2021</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="footer-home">
          <div className="logo-footer"></div>
          <div className="container-link-footer">
            <Link to={INTERNAL_LINKS.CONFERENCE_2023}>
              <p className="p-link-footer" style={{marginRight: "50px"}}>Home</p>
            </Link>
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/speakers"}>
              <p className="p-link-footer" style={{marginRight: "50px"}}>Speakers</p>
            </Link>
            <Link to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}>
              <p className="p-link-footer" >Agenda</p>
            </Link>
          </div>
          <p className="reserved">© 2022 All Rights Reserved</p>
        </div>
      </div>
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
    allParrafs: speakerAllPanelSpeakerSelector(state).allParrafs
  });
  
  const mapDispatchToProps = {
    getAllParafs,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023Home);