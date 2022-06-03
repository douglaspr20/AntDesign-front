import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import ModalCompleteProfile from "./ModalCompleteProfile";
import SpeakersContainer from "./SpeakersContainer";
import Agenda from "./Agenda";
import { authSelector } from "redux/selectors/authSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getUser } from "redux/actions/home-actions";
import { registerUserIfNotAreRegisterConference2023 } from "redux/actions/speaker-actions"

import "./style.scss";

const Conference2023 = ({
  isAuthenticated,
  userProfile,
  getUser,
  registerUserIfNotAreRegisterConference2023
}) => {

  const [bulCompleteProfile,setBulCompleteProfile] = useState(false)
  const [bulMessageOut, setBulMessageOut] = useState(true)
  const [animation, setAnimation] = useState({opacity:"0%"})

  useEffect(() => {
    if(isAuthenticated !== false){
        getUser();   
        if(localStorage.getItem("register") === "true"){
          registerUserIfNotAreRegisterConference2023()
        }
    }
  }, [isAuthenticated, getUser,registerUserIfNotAreRegisterConference2023]);

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
    setAnimation({opacity:"100%"})
    setTimeout(() => {
      setAnimation({opacity:"0%"})
    }, 1760);
    setTimeout(() => {
      setBulMessageOut(false)
      localStorage.setItem("register", false)
    }, 2200);
  }

  return (
    <>
      {isAuthenticated && 
        <>
          {((userProfile.firstName !== undefined && userProfile.firstName !== '' && bulCompleteProfile)) && 
            <div
              bodyStyle={{overflow: "none", padding: "20px"}}
              className="complete-profile"
            >
              <ModalCompleteProfile
                userProfile={userProfile}
                get={getUser}
              />
            </div>
          }
          {(bulCompleteProfile === false && bulMessageOut && localStorage.getItem("register") === "true") && 
            <div className="container-message" style={animation}>
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
          <h1 className="title-containers">SPEAKERS</h1>  
          <SpeakersContainer
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="containers-sponsors" id="sponsors">
          <h1 className="title-containers">Title sponsors</h1>  
        </div>
        <div className="containers-agenda" id="agenda">
          <h1 className="title-containers">Title agenda</h1>  
          <Agenda />
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
    registerUserIfNotAreRegisterConference2023
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conference2023);