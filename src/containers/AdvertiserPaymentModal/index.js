import React, { useState, useEffect } from "react";
import { CustomModal } from "components";
import { loadStripe } from "@stripe/stripe-js";
import { CustomButton } from "components";
import { Alert } from "antd";
import { STRIPE_PRICES } from "enum";

import { getCheckoutSession } from "api/module/stripe";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const AdvertisementPaymentModal = ({ visible, onClose, userProfile }) => {
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

  const requestCheckoutSessionTable = async ({
    isAdvertiser = false,
    isBuyingCredits = false,
    credits = 0,
  }) => {
    setLoading(true);
    setCheckoutSessionError(false);
    setCheckoutSessionErrorMsg("");

    try {
      let sessionData = {};

      if (isAdvertiser) {
        sessionData = await getCheckoutSession({
          prices: [STRIPE_PRICES.ADVERTISER_PRICE.priceId],
          isAdvertisement: true,
        });
      }

      if (isBuyingCredits) {
        const credit = STRIPE_PRICES.ADVERTISEMENT_CREDITS_STRIPE_PRICES.find(
          (cred) => cred.credits === credits
        );

        if (credit) {
          sessionData = await getCheckoutSession({
            isBuyingCredits: true,
            credits: credits,
            prices: [credit.priceId],
          });
        }
      }

      return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } catch (error) {
      setLoading(false);
      setCheckoutSessionError(true);
      setCheckoutSessionErrorMsg(error.response.data.msg);
    }
  };

  const displayBuyCredits =
    STRIPE_PRICES.ADVERTISEMENT_CREDITS_STRIPE_PRICES.map((credit) => {
      return (
        <CustomButton
          key={credit.credits}
          type="primary"
          loading={loading}
          onClick={() =>
            requestCheckoutSessionTable({
              isBuyingCredits: true,
              credits: credit.credits,
            })
          }
          text={`Buy ${credit.credits} credits`}
          block
          style={{ marginTop: "1rem" }}
        />
      );
    });

  return (
    <CustomModal visible={visible} onCancel={onClose}>
      {userProfile.isAdvertiser ? (
        <>
          Buy more credits!
          {displayBuyCredits}
        </>
      ) : (
        <>
          Advertisement Payment Modal
          <CustomButton
            type="primary"
            loading={loading}
            onClick={() =>
              requestCheckoutSessionTable({
                isAdvertiser: true,
              })
            }
            text="Upgrade to Advertiser"
          />
        </>
      )}
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
