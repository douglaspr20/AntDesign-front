import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Alert, Button, Table } from "antd";
import { loadStripe } from "@stripe/stripe-js";

import { envSelector } from "redux/selectors/envSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getCheckoutSession } from "api/module/stripe";

import { STRIPE_PRICES } from "enum";

import IconLogo from "images/logo-sidebar.svg";
import { ReactComponent as IconDoubleCheckmark } from "images/icon-double-checkmark.svg";
import { ReactComponent as IconCloseOutline } from "images/icon-close-outline.svg";

import "./style.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const PaymentForm = ({ isMobile, userProfile, handleSubmit, hidePanel }) => {
  const [stripe, setStripe] = useState(null);
  const [checkoutSessionError, setCheckoutSessionError] = useState(false);
  const [checkoutSessionErrorMsg, setCheckoutSessionErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const paymentColumns = [
    {
      title: "",
      key: "text",
      fixed: "left",
      width: 120,
      dataIndex: "text",
      className: "payment-table-column-text",
    },
    {
      title: "Free",
      key: "free",
      dataIndex: "free",
      align: "center",
      width: 150,
      className: "payment-table-column",
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            return "Free";
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
      className: "payment-table-column",
      width: 150,
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            if (userProfile.memberShip === "premium") {
              return "Premium";
            } else {
              return (
                <Button
                  loading={loading}
                  onClick={() => {
                    requestCheckoutSessionTable(true, false);
                  }}
                  className="pay-buttton"
                >
                  Pay ${STRIPE_PRICES.STRIPE_PRICES[0].price}
                </Button>
              );
            }
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
      width: 150,
      className: "payment-table-column",
      render: (value, record) => {
        if (record.hasOwnProperty("buttonSection")) {
          if (record.buttonSection === true) {
            if (userProfile.memberShip === "channel_admin") {
              return "Creator";
            } else {
              return (
                <Button
                  loading={loading}
                  onClick={() => {
                    requestCheckoutSessionTable(false, true);
                  }}
                  className="pay-buttton"
                >
                  Pay ${STRIPE_PRICES.CHANNELS_STRIPE_PRICES[0].price}
                </Button>
              );
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const requestCheckoutSessionTable = async (
    premium = false,
    creator = false
  ) => {
    setLoading(true);
    setCheckoutSessionError(false);
    setCheckoutSessionErrorMsg("");
    let checkoutSessionPrices = [];
    if (premium === true) {
      checkoutSessionPrices.push(STRIPE_PRICES.STRIPE_PRICES[0].priceId);
    }
    if (creator === true) {
      checkoutSessionPrices.push(
        STRIPE_PRICES.CHANNELS_STRIPE_PRICES[0].priceId
      );
    }
    try {
      let sessionData = await getCheckoutSession({
        prices: checkoutSessionPrices,
      });
      return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } catch (err) {
      setLoading(false);
      setCheckoutSessionError(true);
      setCheckoutSessionErrorMsg(err.response.data.msg);
    }
  };

  const getIcon = (value) => {
    if (value === true) {
      return <IconDoubleCheckmark className="green-icon" />;
    } else {
      return <IconCloseOutline className="red-icon" />;
    }
  };

  return (
    <div
      className={`payment-form-table-container ${clsx("plan-ugrade-form", {
        mobile: isMobile,
      })}`}
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
      <Table
        className="antd-table-payment"
        rowClassName="payment-table-row"
        bordered={false}
        columns={paymentColumns}
        dataSource={paymentsDatasource}
        pagination={false}
        scroll={isMobile && { x: "100vw" }}
      ></Table>
      <br></br>
      {checkoutSessionError && (
        <Alert
          message="Error"
          description={checkoutSessionErrorMsg}
          type="error"
          showIcon
        />
      )}
    </div>
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
