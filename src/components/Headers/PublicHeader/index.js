import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import { CustomButton } from "components";
import IconMenu from "images/icon-menu-outline.svg";
import Login from "pages/Login";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";

import LogoSidebar from "images/logo-sidebar.svg";
// import { PublicMenuPopup } from "components";
// import { PUBLIC_HEADER_MENUS } from "enum";

import "./style.scss";

const PublicHeader = ({
  bulRegister
}) => {

  const [modalRegister, setModalRegister] = useState(false)
  const [butonState, setButonState] = useState(false)

  useEffect(() => {
    if(bulRegister){
      setButonState(true)
    }
  }, [bulRegister])

  return (
    <div 
      className={
        (window.location.pathname.substring(0,15) === INTERNAL_LINKS.CONFERENCE_2023) ? 
        "public-header-conference" : "public-header"
      } 
      style={{width:"calc( 100% - 17px )"}}
    >
      <Link 
        to={INTERNAL_LINKS.HOME} 
        className={
          (window.location.pathname.substring(0,15) === INTERNAL_LINKS.CONFERENCE_2023) ? 
          "public-header-left-conference" : "public-header-left"
        }
      >
        <div className="hr-logo">
          <img src={LogoSidebar} alt="sidebar-logo" />
        </div>
      </Link>
      {/* {PUBLIC_HEADER_MENUS.map((menu, index) => (
        <Link key={index} to={menu.url}>
          <span className="public-header-menu">{menu.text}</span>
        </Link>
      ))} */}
      {/* <PublicMenuPopup>
        <div className="public-header-bar">
          <i className="fal fa-bars" />
        </div>
      </PublicMenuPopup> */}
      {(window.location.pathname.substring(0,15) === INTERNAL_LINKS.CONFERENCE_2023) && 
        <>
          <input id="checkbox" className="checkboxHiden" type="checkbox" style={{zIndex: "100"}} />
          <label htmlFor="checkbox" className="conteiner-icon-menu">
            <img src={IconMenu} alt="icon-menu" />
          </label>
          <div className="public-header-right">
            <div className="public-conference-links">
              <Link 
                style={
                  (window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023) ? 
                  {textDecoration: "underline black"} : {textDecoration: "none"}
                } 
                to={INTERNAL_LINKS.CONFERENCE_2023}
              >
                  <p>Home</p>
              </Link>
            </div>
            <div className="public-conference-links">
              <Link 
                style={
                  (window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023 + "/speakers") ? 
                  {textDecoration: "underline black"} : {textDecoration: "none"}
                } 
                to={INTERNAL_LINKS.CONFERENCE_2023 + "/speakers"}
              >
                  <p>Speakers</p>
              </Link>
            </div>
            <div className="public-conference-links">
              <Link 
                style={
                  (window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023 + "/agenda") ? 
                  {textDecoration: "underline black"} : {textDecoration: "none"}
                } 
                to={INTERNAL_LINKS.CONFERENCE_2023 + "/agenda"}
              >
                  <p>Agenda</p>
              </Link>
            </div>
              {butonState ? (
                <div className="container-you-are-now-register">
                  <div className="div-you-are-now-register">
                    <p>YOU ARE NOW REGISTERED</p>
                  </div>
                </div>
              ) : (
                <CustomButton
                  className="button-speaker"
                  text={"REGISTER HERE"}
                  size="md"
                  type={"primary"}
                  onClick={() => {setModalRegister(true)}}
                />
              )}
          </div> 
          <Modal
            visible={modalRegister}
            footer={null}
            width={400}
            bodyStyle={{ overflow: "auto", padding: "20px" }}
            className="modal-container-login"
            onCancel={() => setModalRegister(false)}
          >
            <Login
              login={true}
              signUp={false}
              history={null}
              match={{ params: {} }}
              modal={setModalRegister}
              onClose={() => setModalRegister(false)}
            />
          </Modal>
        </>
      }
    </div>
  );
};

PublicHeader.propTypes = {
  title: PropTypes.string,
};

PublicHeader.defaultProps = {
  title: "",
};

const mapStateToProps = (state, props) => ({
  bulRegister: speakerAllPanelSpeakerSelector(state).bulRegister
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PublicHeader);
