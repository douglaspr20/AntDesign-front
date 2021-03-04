import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";

import { envSelector } from "redux/selectors/envSelector";
import { getCheckoutSession } from "api/module/stripe";

import { CustomSelect } from 'components';
import { STRIPE_PRICES } from 'enum';

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const PaymentForm = ({ isMobile, handleSubmit, hidePanel }) => {
  const [stripe, setStripe] = useState(null);
  const [price, setPrice] = useState(0);
  const [prices] = useState(STRIPE_PRICES);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    instanceStripe();
    generateCountryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const requestCheckoutSession = async () => {
    let sessionData = await getCheckoutSession({ priceId: prices[price].priceId });
    return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
  };

  const generateCountryOptions = () => {
    let options = [];
    for (let item in prices) {
      options.push({ text: prices[item].country, value: parseInt(item) });
    }
    setOptions(options);
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
          {
            options.length > 0 &&
            <CustomSelect
              options={options}
              defaultValue={price}
              onChange={(value) => { setPrice(value) }}
              className="pay-select"
            />
          }
          <Button
            onClick={() => {
              requestCheckoutSession();
            }}
            className="pay-buttton"
          >
            Subscribe <span className="character-price" dangerouslySetInnerHTML={{ __html: prices[price].character }}></span> {prices[price].price} yearly
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
