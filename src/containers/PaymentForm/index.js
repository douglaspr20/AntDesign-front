import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";

import { envSelector } from "redux/selectors/envSelector";
import { getCheckoutSession } from "api/module/stripe";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const PaymentForm = ({ isMobile, handleSubmit, hidePanel }) => {
  let stripe = null;
  useEffect(() => {
    instanceStripe();
  });

  const instanceStripe = async () => {
    stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);
  };

  const requestCheckoutSession = async (priceId) => {
    let sessionData = await getCheckoutSession({ priceId });
    return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
  };
  return (
    <>
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
          <Button
            onClick={() => {
              requestCheckoutSession(
                process.env.REACT_APP_STRIPE_YEARLY_PRICE_ID
              );
            }}
            className="pay-buttton"
          >
            Subscribe $99.99 yearly
          </Button>
        </div>
      </form>
    </>
  );
};

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
