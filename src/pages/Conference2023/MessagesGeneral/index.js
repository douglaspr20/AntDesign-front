import React, {useEffect, useState, useCallback} from "react";
import { connect } from "react-redux";
import { ModalCompleteYourProfile } from "components";
import { authSelector } from "redux/selectors/authSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getUser } from "redux/actions/home-actions";
import { registerUserIfNotAreRegisterConference2023, setBulRegister } from "redux/actions/speaker-actions"
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";

import "./style.scss";

const MessagesGeneral = ({
  isAuthenticated,
  userProfile,
  getUser,
  registerUserIfNotAreRegisterConference2023,
  setBulRegister,
  bulRegister
}) => {

  const [bulCompleteProfile,setBulCompleteProfile] = useState(false)
  const [bulMessageOut, setBulMessageOut] = useState(false)
  const [animation, setAnimation] = useState({opacity:"0%"})

  const quitMessage = useCallback(() => {
    setAnimation({opacity:"100%"})
    setTimeout(() => {
      setAnimation({opacity:"0%"})
    }, 22000);
    setTimeout(() => {
      setBulMessageOut(false)
      setBulRegister(false)
    }, 2400);
  },[setBulMessageOut,setBulRegister])

  useEffect(() => {
    if(isAuthenticated !== false){
        getUser();   
    }
  }, [isAuthenticated, getUser]);

  useEffect(() => {
    if(bulRegister){
      registerUserIfNotAreRegisterConference2023(() => {
        setBulMessageOut(true)
        quitMessage()
      })
    }
  }, [getUser,registerUserIfNotAreRegisterConference2023,bulRegister,quitMessage])

  useEffect(() => {
    if(userProfile.percentOfCompletion !== undefined){
        if(userProfile.percentOfCompletion !== 100 && userProfile.percentOfCompletion !== 0){
            setBulCompleteProfile(true) 
        }else{
            setBulCompleteProfile(false)
        } 
    }

    if(userProfile.percentOfCompletion !== undefined){
      if(userProfile.percentOfCompletion === 100){
        setBulRegister(true)
      }
    } 

  }, [userProfile, setBulCompleteProfile,setBulRegister])

  return (
    <>
      {isAuthenticated && 
        <>
          {((userProfile.firstName !== undefined && userProfile.firstName !== '' && bulCompleteProfile)) && 
            <div className="complete-profile">
              <ModalCompleteYourProfile
                userProfile={userProfile}
                get={getUser}
              />
            </div>
          }
          {(bulMessageOut && bulRegister) && 
            <div className="complete-profile" style={animation}>
              <div className="container-message">
                <p className="text-message">You are now registered</p>
              </div>
            </div>
          }
        </>
      }
    </>
  );
  };
  
  const mapStateToProps = (state, props) => ({
    isAuthenticated: authSelector(state).isAuthenticated,
    userProfile: homeSelector(state).userProfile,
    bulRegister: speakerAllPanelSpeakerSelector(state).bulRegister
  });
  
  const mapDispatchToProps = {
    getUser,
    registerUserIfNotAreRegisterConference2023,
    setBulRegister
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessagesGeneral);