import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import StripeScriptLoader from "react-stripe-script-loader";
import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import { Button, Input } from "antd";

import { CustomCheckbox } from "components";
import { envSelector } from "redux/selectors/envSelector";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const PaymentForm = ({ isMobile, handleSubmit, hidePanel }) => (
  <StripeScriptLoader
    uniqueId="myUniqueId"
    script="https://js.stripe.com/v3/"
    loader="Loading..."
  >
    <StripeProvider apiKey="pk_test_UrBUzJWPNse3I03Bsaxh6WFX00r6rJ1YCq">
      <Elements>
        <form
          className={clsx("plan-ugrade-form", { mobile: isMobile })}
          onSubmit={handleSubmit}
        >
          {isMobile && (
            <>
              <div className="plan-ugrade-form-header">
                <div className="plan-ugrade-form-header-logo">
                  <img src={IconLogo} alt="payment-logo" />
                </div>
                <h3>Plan update</h3>
                <h5>Access to all content</h5>
              </div>
              <div className="plan-ugrade-form-close" onClick={hidePanel}>
                <i className="fas fa-times" />
              </div>
            </>
          )}
          <div className="plan-ugrade-form-content">
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
              <CustomCheckbox size={isMobile ? "sm" : "xs"} text="Remember me">
                Remember me
              </CustomCheckbox>
            </div>
            <Button htmlType="submit" className="pay-buttton monthly">
              Pay $9.99 monthly
            </Button>
            <Button onClick={handleSubmit} className="pay-buttton">
              Pay $99.99 yearly
            </Button>
          </div>
        </form>
      </Elements>
    </StripeProvider>
  </StripeScriptLoader>
);

PaymentForm.propTypes = {
  handleSubmit: PropTypes.func,
  hidePanel: PropTypes.func,
};

PaymentForm.defaultProps = {
  handleSubmit: () => {},
  hidePanel: () => {},
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

export default connect(mapStateToProps)(PaymentForm);
