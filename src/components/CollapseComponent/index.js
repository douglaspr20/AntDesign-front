import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CustomButton} from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";

import "./style.scss";

const CollapseComponent = ({
    informationCollapse,
    dataIterated,
    dataStatic,
    className,
    buttons,
    index,
}) => {
    
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
        <div className={className} key={index}>
            {informationCollapse}
            <div style={{width:"100%", height:"50px"}}></div>
            <div className="container-button">
                {buttons} 
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
                {
                    (dataIterated.props.children.length > 0) ? (
                        <>
                            {dataStatic}
                            {dataIterated}
                        </>
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

  CollapseComponent.propTypes = {
    informationCollapse: PropTypes.element,
    dataIterated: PropTypes.element,
    dataStatic: PropTypes.element,
    buttons: PropTypes.element,
    className: PropTypes.string,
    index: PropTypes.number,
  };
  
  CollapseComponent.defaultProps = {
    informationCollapse: <></>,
    dataIterated: <></>,
    dataStatic: <></>,
    buttons: <></>,
    className: "",
    index: -1,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CollapseComponent);