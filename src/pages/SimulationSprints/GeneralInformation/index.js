import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { getCheckoutSession } from "api/module/stripe";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";
import PricesCard from "../PricesCard";
import { STRIPE_PRICES } from "enum";
import { Alert } from "antd";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const GeneralInformation = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [showProfileCompletionFirewall, setShowProfileCompletionFirewall] =
    useState(false);
  const [stripe, setStripe] = useState(null);
  const [checkoutSessionError, setCheckoutSessionError] = useState(false);
  const [checkoutSessionErrorMsg, setCheckoutSessionErrorMsg] = useState("");

  useEffect(() => {
    instanceStripe();
  }, []);

  const instanceStripe = async () => {
    setStripe(await stripePromise);
  };

  const handleBuySimulation = async (simulations = "0") => {
    setLoading(true);
    if (!userProfile.completed || userProfile.percentOfCompletion < 100) {
      return setShowProfileCompletionFirewall(true);
    }

    const prices = STRIPE_PRICES.SIMULATION_SPRINT_PRICES.find(
      (p) => p.simulations === simulations
    );

    try {
      let sessionData = await getCheckoutSession({
        isBuyingSimulations: true,
        simulations,
        prices: [prices.priceId],
        callback_url: `${process.env.REACT_APP_DOMAIN_URL}/simulation-sprints`,
      });
      return stripe.redirectToCheckout({ sessionId: sessionData.data.id });
    } catch (err) {
      setLoading(false);
      setCheckoutSessionError(true);
      setCheckoutSessionErrorMsg(err.response.data.msg);
    }
  };

  const completeProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
  };

  const prices = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(number);
  };

  return (
    <>
      <div className="simulation-sprints-information">
        <h3>Hi {userProfile.firstName}</h3>
        <p>Welcome to Hacking HR’s Simulation Sprints!</p>
        <p>
          {" "}
          Thank you for checking out this page to find out more about one of our
          flagship learning programs.
        </p>
      </div>

      <div className="simulation-sprints-information">
        <h2>Simulation Sprints</h2>
        <p>
          ProjectX is a cohort-based, skill-focused learning program designed to
          help you learn or improve your knowledge in the specific
          cohort-skills. We do this through daily resources that will help you
          learn and encourage you to reflect about the lessons learned and how
          to apply them to your daily professional work.
        </p>
      </div>

      <div className="simulation-sprints-information">
        <h2>How it works</h2>
        <p>
          This program is intense, but light touch: we will provide a daily
          resource that you should be able to read, listen or watch in less than
          20 minutes.
        </p>
        <p>
          After reading, listening or watching the resource, you will provide a
          personal reflection about what you learned and how you plan to apply
          the lessons learned.
        </p>
        <p>
          This cohort program lasts 66 consecutive days (yes, consecutive means
          every day, including weekends and any holidays that fall in between).
          Each day, for 66 consecutive days, you will receive via email and the
          cohort dashboard a daily resource. You need to provide your daily
          reflection also in the dashboard.
        </p>
        <p>
          This approach to learning is fast, but also allows for lots of
          flexibility. Reading/watching/listening to the daily resource and
          providing your reflection won’t take more than 20-25 minutes per day…
          Hey, “excellence is a habit”… and we aim to make light-touch learning
          a habit with discipline and commitment.
        </p>
        <p>
          The program relies on daily consistency and discipline. Instead of
          bugging you with heavy daily resources, “self-pace” learning program
          from which you disengage too soon or long programs that lasts for
          hours and months, we only ask you for 20-25 minutes or less on a daily
          basis for 66 days. That’s it!
        </p>
      </div>

      <div className="simulation-sprints-information">
        <h2>The Conditions</h2>
        <p>
          Please note: you MUST complete all the requirements of the program and
          the completion will be assessed weekly. If in any given week you fail
          to complete two or more reflections, unfortunately you will be removed
          from the program and won’t be able to access the dashboard anymore and
          won’t receive the learning resources either.
        </p>
        <p>We hope you join us! </p>
        <p>Thank you! </p>
      </div>

      <div className="simulation-sprints-prices">
        <PricesCard
          title="One Simulation"
          description="Lorem ipsum"
          prices={prices(700)}
          handleBuySimulation={() => handleBuySimulation("1")}
          loading={loading}
        />
        <PricesCard
          title="Four Simulations"
          description="Lorem ipsum"
          prices={prices(2500)}
          handleBuySimulation={() => handleBuySimulation("4")}
          loading={loading}
        />
        <PricesCard
          title="Eight Simulations"
          description="Lorem ipsum"
          prices={prices(4000)}
          handleBuySimulation={() => handleBuySimulation("8")}
          loading={loading}
        />
      </div>

      {showProfileCompletionFirewall && (
        <div
          className="simulation-sprint-firewall"
          onClick={() => setShowProfileCompletionFirewall(false)}
        >
          <div className="upgrade-notification-panel" onClick={completeProfile}>
            <h3>
              You must fully complete your profile before you can purchase any
              of the simulation sprint packages.
            </h3>
          </div>
        </div>
      )}

      {checkoutSessionError && (
        <Alert
          message="Error"
          description={checkoutSessionErrorMsg}
          type="error"
          showIcon
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
