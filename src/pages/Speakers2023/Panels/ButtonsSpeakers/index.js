import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { CustomButton } from "components";

import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as speaker } from "redux/actions/speaker-actions";
import { getUser } from "redux/actions/home-actions";

const ButtonsSpeakers = ({
    role,
    userProfile,
    setOpenSearchUser,
    panels,
    setBulCompleteProfile,
    setPanel,
    joinUser,
    removeUserFunction,
    setRemoveMembersSpeakers,
    removeMembersSpeakers,
  }) => {

    const {id, startDate, endDate, panelName} = panels
  
    const [bulJoinOrWithdraw, setBulJoinOrWithdraw] = useState(false)
    const [idWithdraw, setIdWithdraw] = useState(-1)
    const [withdraw, setWithdraw] = useState(false)

    panels.SpeakerMemberPanels.forEach((data) => {
        if(withdraw !== true && bulJoinOrWithdraw !== true){
          if(userProfile.id === data.User.id){
              setWithdraw(true)
              setIdWithdraw(data.id)
          }
        }
    })

    const takeActionWithdrawOrJoinUser = () => {
        if(withdraw){
            setBulJoinOrWithdraw(true)
            removeUserFunction(idWithdraw)
            setWithdraw(false)
            setIdWithdraw(-1)
        }else{
            if(userProfile.percentOfCompletion === 100){
                setBulJoinOrWithdraw(false)
                joinUser({
                    id:id,
                    startDate: startDate,
                    endDate: endDate, 
                    panelName: panelName
                })
            }else{
                setBulCompleteProfile(true)
            }
        }
    }

    useEffect(() => {
      if(removeMembersSpeakers){
        setTimeout(() => {
          setRemoveMembersSpeakers(false)
          setWithdraw(false)
          setIdWithdraw(-1)
        }, 100)
      }
    },[removeMembersSpeakers,setRemoveMembersSpeakers,setWithdraw, setIdWithdraw ])

    return (
      <>
        <CustomButton
            className="button-speaker"
            text={(withdraw) ? "Withdraw" : "Join"}
            size="md"
            type={(withdraw) ? "third" : "secondary"}
            onClick={() => takeActionWithdrawOrJoinUser()}
        />  
        {(role === "admin") && 
            <CustomButton
                className="button-speaker"
                text="Add user"
                size="md"
                type="primary"
                onClick={() => {
                setPanel({
                        id:id,
                        startDate: startDate,
                        endDate: endDate, 
                        panelName: panelName
                    })
                    setOpenSearchUser(true) 
                }}
            /> 
        }
    </>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
    allUserSpeaker: speakerAllPanelSpeakerSelector(state).allUserSpeakers,
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    removeUserSpeakerToPanel: speaker.removeUserSpeakerToPanel,
    addUserSpeakerToPanel: speaker.addUserSpeakerToPanel,
    getUser
  };

  ButtonsSpeakers.propTypes = {
    role: PropTypes.string,
    setOpenSearchUser: PropTypes.func,
    joinUser: PropTypes.func,
    removeUserFunction: PropTypes.func
  };
  
  ButtonsSpeakers.defaultProps = {
    role: "",
    setOpenSearchUser: () => {},
    joinUser: () => {},
    removeUserFunction: () => {}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ButtonsSpeakers);
  