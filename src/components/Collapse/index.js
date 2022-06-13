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
    joinUser
}) => {

    const {panelName, startDate, endDate, description, id} = panels
    
    const [visibleConfirmApply, setVisibleConfirmApply] = useState(false);
    const memberRef = useRef();

    const collapseFunction = () => {
        if(visibleConfirmApply !== true){
            memberRef.current.scroll(0,0)
            setVisibleConfirmApply(true)
        }else{
            setVisibleConfirmApply(false)
        }
    }

    return (
      <>
        <div className="container-panel-speaker" key={id}>
            <p className="container-panel-speaker-parraf">Title: <span className="not-bold">{panelName}</span></p>
            <p className="container-panel-speaker-parraf">Description: <span className="not-bold">{description}</span></p>
            <div style={{width:"100%", height:"50px"}}></div>
            <div className="container-button">
                <CustomButton
                    className="button-speaker"
                    text="Join"
                    size="md"
                    type="secondary"
                    onClick={() => {
                        joinUser({
                            id:id,
                            startDate: startDate,
                            endDate: endDate, 
                            panelName: panelName
                        })
                    }}
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
                    text={`${visibleConfirmApply ? "Few" : "More" } information`}
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
                {(members.props.children.length > 0) ? members : 
                    <NoItemsMessageCard
                        message={`There aren't members in this panel.`}
                    />
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
    joinUser: PropTypes.func
  };
  
  Collapse.defaultProps = {
    panels: {},
    members: <></>,
    isAdmin: false,
    searchUser: () => {},
    setId: () => {},
    joinUser: () => {}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Collapse);
  