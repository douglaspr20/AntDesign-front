import React, {useState} from "react";
import PropTypes from "prop-types";
import { INTERNAL_LINKS } from "enum";
import { CustomButton } from "components";
import IconMenu from "images/icon-menu-outline.svg";
import Login from "pages/Login";
import { Modal } from "antd";

import LogoSidebar from "images/logo-sidebar.svg";
// import { PublicMenuPopup } from "components";
// import { PUBLIC_HEADER_MENUS } from "enum";

import "./style.scss";

const PublicHeader = () => {

  const [modalRegister, setModalRegister] = useState(false)

  return (
    <div className={(window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023) ? "public-header-conference" : "public-header"}>
      <div className={(window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023) ? "public-header-left-conference" : "public-header-left"}>
        <div className="hr-logo">
          <img src={LogoSidebar} alt="sidebar-logo" />
        </div>
      </div>
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
      {(window.location.pathname === INTERNAL_LINKS.CONFERENCE_2023) && 
        <>
          <input id="checkbox" className="checkboxHiden" type="checkbox" style={{zIndex: "100"}} />
          <label htmlFor="checkbox" className="conteiner-icon-menu">
            <img src={IconMenu} alt="icon-menu" />
          </label>
          <div className="public-header-right">
            <div className="public-conference-links">
              <a style={{textDecoration: "none"}} href="#home">
                  <p>Home</p>
              </a>
            </div>
            <div className="public-conference-links">
              <a style={{textDecoration: "none"}} href="#speakers">
                  <p>Speakers</p>
              </a>
            </div>
            <div className="public-conference-links">
              <a style={{textDecoration: "none"}} href="#sponsors">
                  <p>Sponsors</p>
              </a>
            </div>
            <div className="public-conference-links">
              <a style={{textDecoration: "none"}} href="#agenda">
                  <p>Agenda</p>
              </a>
            </div>
            <div className="public-conference-links">
              <a style={{textDecoration: "none"}} href="#agenda">
                  <p style={{width: "200px"}} >In-Person Experience</p>
              </a>
            </div>
            {(JSON.parse(localStorage.getItem("community")) === null) && 
              <CustomButton
                className="button-speaker"
                text="REGISTER HERE"
                size="md"
                type="primary"
                onClick={() => {setModalRegister(true)}}
              />
            }
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

export default PublicHeader;
