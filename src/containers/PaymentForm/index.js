import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button, Select } from "antd";
import { loadStripe } from "@stripe/stripe-js";

import { envSelector } from "redux/selectors/envSelector";
import { getCheckoutSession } from "api/module/stripe";
import { STRIPE_PRICES } from 'enum';

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const PaymentForm = ({ isMobile, handleSubmit, hidePanel }) => {
  const [price, setPrice] = useState(0);
  const [prices] = useState(STRIPE_PRICES);

  let stripe = null;
  useEffect(() => {
    instanceStripe();
  });

  const instanceStripe = async () => {
    stripe = await stripePromise;
  };

  const requestCheckoutSession = async () => {
    let sessionData = await getCheckoutSession({ priceId: prices[price].priceId });
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
          <h4>Select:</h4>
          <Select className="pay-select" defaultValue={price} onChange={(value) => { setPrice(value) }}>
            {
              prices.map((item, index) => {
                return (<Select.Option key={`price${index}`} value={index}>{item.country}</Select.Option>)
              })
            }
          </Select>
          <Button
            onClick={() => {
              requestCheckoutSession();
            }}
            className="pay-buttton"
          >
            Subscribe $ {prices[price].price} yearly
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
  handleSubmit: () => { },
  hidePanel: () => { },
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

export default connect(mapStateToProps)(PaymentForm);
