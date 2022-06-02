import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import ModalCompleteProfile from "./ModalCompleteProfile";
import { Modal } from "antd";
import { authSelector } from "redux/selectors/authSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getUser } from "redux/actions/home-actions";
import { sendEmailRegisterConference2023 } from "redux/actions/speaker-actions"

import "./style.scss";

const Conference2023 = ({
  isAuthenticated,
  userProfile,
  getUser,
  sendEmailRegisterConference2023
}) => {

  const [bulCompleteProfile,setBulCompleteProfile] = useState(false)
  const [bulMessageOut, setBulMessageOut] = useState(true)

  useEffect(() => {
    if(isAuthenticated !== false){
        getUser();   
        if(localStorage.getItem("register") === "true"){
          sendEmailRegisterConference2023()
        }
    }
  }, [isAuthenticated, getUser,sendEmailRegisterConference2023]);

  useEffect(() => {
    if(userProfile.percentOfCompletion !== undefined){
        if(userProfile.percentOfCompletion !== 100 && userProfile.percentOfCompletion !== 0){
            setBulCompleteProfile(true) 
        }else{
            setBulCompleteProfile(false)
        } 
    }

    if(localStorage.getItem("register") === "true"){
      setBulMessageOut(true)
      quitMessage()
    }

  }, [userProfile, setBulCompleteProfile])

  useEffect(() => {
    quitMessage()
  }, [])

  const quitMessage = () => {
    setTimeout(() => {
      setBulMessageOut(false)
      localStorage.setItem("register", false)
    }, 2200);
  }

  return (
    <>
      {isAuthenticated && 
        <>
          {((userProfile.firstName !== undefined && userProfile.firstName !== '')) && 
            <Modal 
              visible={bulCompleteProfile}
              footer={null}
              width={400}
              bodyStyle={{overflow: "none", padding: "20px"}}
              className="modal-container-complete-profile"
            >
              <ModalCompleteProfile
                userProfile={userProfile}
                get={getUser}
              />
            </Modal>
          }
          {(bulCompleteProfile === false && bulMessageOut && localStorage.getItem("register") === "true") && 
            <div className="container-message">
              <p className="text-message">You are now registered</p>
            </div>
          }
        </>
      }
      <div className="container-conference">
        <div className="imagen-conference"></div>
        <div className="containers-home" id="home">
          <h1 className="title-containers">Title home</h1>
        </div>
        <div className="containers-speakers" id="speakers">
          <h1 className="title-containers">Title speakers</h1>  
        </div>
        <div className="containers-sponsors" id="sponsors">
          <h1 className="title-containers">Title sponsors</h1>  
        </div>
        <div className="containers-agenda" id="agenda">
          <h1 className="title-containers">Title agenda</h1>  
        </div>
      </div>
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
    isAuthenticated: authSelector(state).isAuthenticated,
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    getUser,
    sendEmailRegisterConference2023
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023);