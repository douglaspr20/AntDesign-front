import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CustomButton } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";

import "./style.scss";

const Collapse = ({
    panels,
    members,
    isAdmin,
    searchUser,
    setId,
    joinUser,
    UserProfile,
    removeUserFunction,
    setBulCompleteProfile
}) => {

    const {panelName, startDate, endDate, description, id} = panels
    
    const [visibleConfirmApply, setVisibleConfirmApply] = useState(false);
    const [withdrow, setWithdrow] = useState(false)
    const [idWithdrow, setIdWithdrow] = useState(-1)
    const [bulJoinOrWithdraw, setBulJoinOrWithdraw] = useState(false)
    const memberRef = useRef();


    const collapseFunction = () => {
        if(visibleConfirmApply !== true){
            memberRef.current.scroll(0,0)
            setVisibleConfirmApply(true)
        }else{
            setVisibleConfirmApply(false)
        }
    }

    members.props.children.forEach((data) => {
        if(withdrow !== true && bulJoinOrWithdraw !== true){
            if(UserProfile.id === data.props.usersPanel.User.id){
                setWithdrow(true)
                setIdWithdrow(data.props.usersPanel.id)
            }
        }
    })

    const takeActionWithdrawOrJoinUser = () => {
        if(withdrow){
            setBulJoinOrWithdraw(true)
            removeUserFunction(idWithdrow)
            setWithdrow(false)
            setIdWithdrow(-1)
        }else{
            if(UserProfile.percentOfCompletion === 100){
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

    return (
      <>
        <div className="container-panel-speaker" key={id}>
            <p className="container-panel-speaker-parraf" style={{fontSize: "16px"}}>Title: <span className="not-bold">{panelName}</span></p>
            <p className="container-panel-speaker-parraf">Description: <span className="not-bold">{description}</span></p>
            <div style={{width:"100%", height:"50px"}}></div>
            <div className="container-button">
                <CustomButton
                    className="button-speaker"
                    text={(withdrow) ? "Withdrow" : "Join"}
                    size="md"
                    type={(withdrow) ? "third" : "secondary"}
                    onClick={() => takeActionWithdrawOrJoinUser()}
                />  
                {isAdmin && <CustomButton
                    className="button-speaker"
                    text="Add user"
                    size="md"
                    type="primary"
                    onClick={() => {
                        setId({
                            id:id,
                            startDate: startDate,
                            endDate: endDate, 
                            panelName: panelName
                        })
                        searchUser(true) 
                    }}
                /> }
                <CustomButton
                    className="button-speaker"
                    text={`${visibleConfirmApply ? "Less" : "More" } information`}
                    size="md"
                    type="information"
                    onClick={() => {collapseFunction()}}
                /> 
            </div>
            <div 
                className={`${visibleConfirmApply ? "collapseContaintTrue" : "collapseContaintFalse"}`} 
                ref={memberRef}
                style={{opacity: `${visibleConfirmApply ? "100%" : "0%"}`}}
            >
                {(members.props.children.length > 0) ? (
                    members
                    ) : (
                        <NoItemsMessageCard
                            message={`There aren't members in this panel.`}
                        />
                    )
                }
            </div>
        </div>
      </>
    );
  };
  
  const mapStateToProps = (state, props) => ({

  });
  
  const mapDispatchToProps = {

  };

  Collapse.propTypes = {
    panels: PropTypes.object,
    members: PropTypes.element,
    isAdmin: PropTypes.bool,
    searchUser: PropTypes.func,
    setId: PropTypes.func,
    joinUser: PropTypes.func,
    UserProfile: PropTypes.object,
    removeUserFunction: PropTypes.func,
    setBulCompleteProfile: PropTypes.func,
  };
  
  Collapse.defaultProps = {
    panels: {},
    members: <></>,
    isAdmin: false,
    searchUser: () => {},
    setId: () => {},
    joinUser: () => {},
    UserProfile: {},
    removeUserFunction: () => {},
    setBulCompleteProfile: () => {},
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Collapse);
  