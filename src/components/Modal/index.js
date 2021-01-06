import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { connect } from "react-redux";
import { CloseCircleFilled } from "@ant-design/icons";

import { envSelector } from "redux/selectors/envSelector";
import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const CustomModal = ({
  title,
  subTitle,
  visible,
  width,
  children,
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      className="custom-modal"
      title={
        <div className="custom-modal-title">
          <h3>{title}</h3>
          <h5>{subTitle}</h5>
          <div className="custom-modal-logo">
            <img src={IconLogo} alt="custom-logo" />
          </div>
        </div>
      }
      centered
      visible={visible}
      width={width}
      closable={true}
      footer={[]}
      closeIcon={<CloseCircleFilled className="custom-modal-close" />}
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  visible: PropTypes.bool,
  width: PropTypes.number,
};

CustomModal.defaultProps = {
  title: "",
  subTitle: "",
  visible: false,
  width: 300,
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

export default connect(mapStateToProps)(CustomModal);
