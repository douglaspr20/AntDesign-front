import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Input } from "antd";
import { connect } from "react-redux";
import { CloseCircleFilled } from "@ant-design/icons";
import StripeScriptLoader from "react-stripe-script-loader";
import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";

import { CustomCheckbox } from "components";
import { setPlanUpdated } from "redux/actions/home-actions";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const PaymentModal = ({ visible, onPay, setPlanUpdated, ...rest }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onPay();
    setPlanUpdated(true);
  };

  return (
    <Modal
      {...rest}
      className="payment-modal"
      title={
        <div className="payment-modal-title">
          <h3>Plan update</h3>
          <h5>Access to all content</h5>
          <div className="payment-modal-logo">
            <img src={IconLogo} alt="payment-logo" />
          </div>
        </div>
      }
      centered
      visible={visible}
      width={300}
      closable={true}
      footer={[]}
      closeIcon={<CloseCircleFilled className="payment-modal-close" />}
    >
      <StripeScriptLoader
        uniqueId="myUniqueId"
        script="https://js.stripe.com/v3/"
        loader="Loading..."
      >
        <StripeProvider apiKey="pk_test_UrBUzJWPNse3I03Bsaxh6WFX00r6rJ1YCq">
          <Elements>
            <form className="plan-ugrade-form" onSubmit={handleSubmit}>
              <div className="input-wrapper email">
                <i className="fal fa-envelope" />
                <Input placeholder="Email" />
              </div>
              <div className="input-wrapper">
                <i className="far fa-credit-card" />
                <CardNumberElement placeholder="Card number" />
              </div>
              <div className="d-flex">
                <div className="input-wrapper">
                  <i className="far fa-calendar" />
                  <CardExpiryElement />
                </div>
                <div className="input-wrapper">
                  <i className="fal fa-lock" />
                  <CardCVCElement placeholder="" />
                </div>
              </div>
              <div className="input-wrapper remember">
                <CustomCheckbox size="xs" text="Remember me">
                  Remember me
                </CustomCheckbox>
              </div>
              <Button htmlType="submit" className="pay-buttton">
                Pay $19.99
              </Button>
            </form>
          </Elements>
        </StripeProvider>
      </StripeScriptLoader>
    </Modal>
  );
};

PaymentModal.propTypes = {
  visible: PropTypes.bool,
  onPay: PropTypes.func,
};

PaymentModal.defaultProps = {
  visible: false,
  onPay: () => {},
};

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};

const mapDispatchToProps = {
  setPlanUpdated,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
