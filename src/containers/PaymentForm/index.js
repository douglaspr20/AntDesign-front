import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Alert, Button, Card, Table } from "antd";
import { loadStripe } from "@stripe/stripe-js";

import { envSelector } from "redux/selectors/envSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getCheckoutSession } from "api/module/stripe";

import { CustomSelect } from "components";
import { STRIPE_PRICES } from "enum";

import IconLogo from "images/logo-sidebar.svg";
import { ReactComponent as IconDoubleCheckmark } from "images/icon-double-checkmark.svg";
import { ReactComponent as IconCloseOutline } from "images/icon-close-outline.svg";

import "./style.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const PaymentForm = ({ isMobile, userProfile, handleSubmit, hidePanel }) => {
  const [stripe, setStripe] = useState(null);
  const [price, setPrice] = useState(0);
  const [prices] = useState(STRIPE_PRICES.STRIPE_PRICES);
  const [channelsPrices] = useState(STRIPE_PRICES.CHANNELS_STRIPE_PRICES);
  const [options, setOptions] = useState([]);
  const [checkoutSessionError, setCheckoutSessionError] = useState(false);
  const [checkoutSessionErrorMsg, setCheckoutSessionErrorMsg] = useState("");
  const [oldPaymentForm] = useState(false);

  const paymentColumns = [
    {
      title: "",
      key: "text",
      dataIndex: "text",
      className: "payment-table-column-text",
    },
    {
      title: "Free",
      key: "free",
      dataIndex: "free",
      align: "center",
      width: 190,
      className: "payment-table-column",
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            return <Button className="pay-buttton">Free</Button>;
          }
        } else {
          return getIcon(value);
        }
      },
    },
    {
      title: "Premium",
      key: "premium",
      dataIndex: "premium",
      align: "center",
      width: 190,
      className: "payment-table-column",
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            return <Button className="pay-buttton">Pay $19.99</Button>;
          }
        } else {
          return getIcon(value);
        }
      },
    },
    {
      title: "Creator",
      key: "creator",
      dataIndex: "creator",
      align: "center",
      width: 190,
      className: "payment-table-column",
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            return <Button className="pay-buttton">Pay $19.99</Button>;
          }
        } else {
          return getIcon(value);
        }
      },
    },
  ];

  const paymentsDatasource = [
    {
      text: "Participation in all Hacking HR online events",
      free: true,
      premium: true,
      creator: true,
    },
    {
      text: "Access to: learning library, mentoring, conference library, classes, podcast and podcast series",
      free: true,
      premium: true,
      creator: true,
    },
    {
      text: "Access to learning journeys",
      free: false,
      premium: true,
      creator: true,
    },
    {
      text: "HR certification credits (for applicable learning items in the learning library, conference library, podcast series or classes)",
      free: false,
      premium: true,
      creator: true,
    },
    {
      text: "Content sharing with the community: events, podcasts, videos, classes and other resources",
      free: false,
      premium: false,
      creator: true,
    },
    {
      text: "",
      buttonSection: true,
    },
  ];

  useEffect(() => {
    instanceStripe();
    generateCountryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const requestCheckoutSession = async (premium = false, creator = false) => {
    setCheckoutSessionError(false);
    setCheckoutSessionErrorMsg("");
    let checkoutSessionPrices = [];
    if (premium === true) {
      checkoutSessionPrices.push(prices[price].priceId);
    }
    if (creator === true) {
      checkoutSessionPrices.push(channelsPrices[price].priceId);
    }
    try {
      let sessionData = await getCheckoutSession({
        prices: checkoutSessionPrices,
      });
      return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } catch (err) {
      setCheckoutSessionError(true);
      setCheckoutSessionErrorMsg(err.response.data.msg);
    }
  };

  const generateCountryOptions = () => {
    let options = [];
    for (let item in prices) {
      options.push({ text: prices[item].country, value: parseInt(item) });
    }
    setOptions(options);
  };

  const getIcon = (value) => {
    if (value === true) {
      return <IconDoubleCheckmark className="green-icon" />;
    } else {
      return <IconCloseOutline className="red-icon" />;
    }
  };

  return (
    <>
      {oldPaymentForm === true ? (
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
            {options.length > 0 && (
              <CustomSelect
                options={options}
                defaultValue={price}
                onChange={(value) => {
                  setPrice(value);
                }}
                className="pay-select"
              />
            )}
          </div>

          <div className="plan-upgrade-cards">
            {userProfile.memberShip === "free" && (
              <Card title="PREMIUM">
                <h3>
                  <span
                    className="character-price"
                    dangerouslySetInnerHTML={{
                      __html: prices[price].character,
                    }}
                  ></span>{" "}
                  {prices[price].price} per year
                </h3>
                <br></br>
                <Button
                  onClick={() => {
                    requestCheckoutSession(true);
                  }}
                  className="pay-buttton"
                >
                  Subscribe
                </Button>
              </Card>
            )}
            {userProfile.memberShip === "free" &&
              userProfile.channelsSubscription === false && (
                <Card title="PREMIUM + CREATOR">
                  <h3>
                    <span
                      className="character-price"
                      dangerouslySetInnerHTML={{
                        __html: prices[price].character,
                      }}
                    ></span>
                    {(
                      parseFloat(prices[price].price.replace(",", "")) +
                      parseFloat(channelsPrices[price].price.replace(",", ""))
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    per year
                  </h3>
                  <br></br>
                  <Button
                    onClick={() => {
                      requestCheckoutSession(true, true);
                    }}
                    className="pay-buttton"
                  >
                    Subscribe
                  </Button>
                </Card>
              )}
            {userProfile.memberShip === "premium" &&
              userProfile.channelsSubscription === false && (
                <Card title="CREATOR">
                  <h3>
                    <span
                      className="character-price"
                      dangerouslySetInnerHTML={{
                        __html: prices[price].character,
                      }}
                    ></span>{" "}
                    {channelsPrices[price].price} per year
                  </h3>
                  <br></br>
                  <Button
                    onClick={() => {
                      requestCheckoutSession(false, true);
                    }}
                    className="pay-buttton"
                  >
                    Subscribe
                  </Button>
                </Card>
              )}
          </div>
          {checkoutSessionError && (
            <Alert
              message="Error"
              description={checkoutSessionErrorMsg}
              type="error"
              showIcon
            />
          )}
        </form>
      ) : (
        <div className="payment-form-table-container">
          <Table
            className="antd-table-payment"
            rowClassName="payment-table-row"
            bordered={false}
            style={{ width: "862px" }}
            columns={paymentColumns}
            dataSource={paymentsDatasource}
            pagination={false}
          ></Table>
        </div>
      )}
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
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(PaymentForm);
