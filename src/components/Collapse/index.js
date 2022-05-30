import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CustomButton } from "components";
import moment from "moment";
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
            <p className="container-panel-speaker-parraf">Titulo: <span className="not-bold">{panelName}</span></p>
            <p className="container-panel-speaker-parraf">Description: <span className="not-bold">{description}</span></p>
            <p className="container-panel-speaker-parraf">Start Date: <span className="not-bold">{moment(startDate).format("MM-DD-YYYY hh:mm a")}</span></p>
            <p className="container-panel-speaker-parraf">End Date: <span className="not-bold">{moment(endDate).format("MM-DD-YYYY hh:mm a")}</span></p>
            <div className="container-button">
                <CustomButton
                    className="button-speaker"
                    text="Join"
                    size="md"
                    type="secondary"
                    onClick={() => {
                        joinUser(id)
                    }}
                />  
                {isAdmin && <CustomButton
                    className="button-speaker"
                    text="Add user"
                    size="md"
                    type="primary"
                    onClick={() => {
                        setId(id)
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
  