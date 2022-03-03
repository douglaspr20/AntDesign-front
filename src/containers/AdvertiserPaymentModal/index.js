import React, { useState, useEffect } from "react";
import { CustomModal } from "components";
import { loadStripe } from "@stripe/stripe-js";
import { CustomButton } from "components";
import { Alert } from "antd";

import { getCheckoutSession } from "api/module/stripe";

const ADVERTISER_PRICE = {
  price: "100",
  country: "GLOBAL",
  character: "&#36",
  priceId: process.env.REACT_APP_STRIPE_ONE_TIME_ADVERTISER_ID,
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const AdvertisementPaymentModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [checkoutSessionError, setCheckoutSessionError] = useState(false);
  const [checkoutSessionErrorMsg, setCheckoutSessionErrorMsg] = useState("");
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    instanceStripe();
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const requestCheckoutSessionTable = async () => {
    setLoading(true);
    setCheckoutSessionError(false);
    setCheckoutSessionErrorMsg("");

    try {
      let sessionData = await getCheckoutSession({
        prices: [ADVERTISER_PRICE.priceId],
        isAdvertisement: true,
      });

      return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } catch (error) {
      setLoading(false);
      setCheckoutSessionError(true);
      setCheckoutSessionErrorMsg(error.response.data.msg);
    }
  };

  return (
    <CustomModal visible={visible} onCancel={onClose}>
      Advertisement Payment Modal
      <CustomButton
        type="primary"
        loading={loading}
        onClick={() => requestCheckoutSessionTable()}
        text="Upgrade to Advertiser"
      />
      {checkoutSessionError && (
        <Alert
          message="Error"
          description={checkoutSessionErrorMsg}
          type="error"
          showIcon
        />
      )}
    </CustomModal>
  );
};

export default AdvertisementPaymentModal;
