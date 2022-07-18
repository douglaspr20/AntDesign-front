import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Alert, Menu } from "antd";
import qs from "query-string";
import { getCheckoutSession } from "api/module/stripe";
import { homeSelector } from "redux/selectors/homeSelector";
import { EVENT_TYPES, INTERNAL_LINKS, STRIPE_PRICES } from "enum";
import GeneralInformation from "./GeneralInformation";
import UpcomingSprints from "./UpcomingSprints";
import MySprints from "./MySprints";
import Emitter from "services/emitter";
import "./style.scss";
import PricesContainer from "./PricesContainer";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const SimulationSprintsPage = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [showProfileCompletionFirewall, setShowProfileCompletionFirewall] =
    useState(false);
  const [selectedKeys, setSelectedKeys] = useState("general-information");
  const [checkoutSessionError, setCheckoutSessionError] = useState(false);
  const [checkoutSessionErrorMsg, setCheckoutSessionErrorMsg] = useState("");

  const location = useLocation();

  const parsed = qs.parse(location.search);

  useEffect(() => {
    setSelectedKeys(parsed.key || "general-information");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.replaceState(
      null,
      "Page",
      `${INTERNAL_LINKS.SIMULATION_SPRINTS}?key=${selectedKeys}`
    );
  }, [selectedKeys]);

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

  return (
    <div className="simulation-sprints">
      <div className="simulation-sprints-container">
        <Menu
          mode="horizontal"
          className="sub-menu"
          selectedKeys={selectedKeys}
        >
          <Menu.Item
            key="general-information"
            className="sub-menu-item-global-conference"
            onClick={() => setSelectedKeys("general-information")}
          >
            General Information
          </Menu.Item>

          <Menu.Item
            key="upcoming-sprints"
            className="sub-menu-item-global-conference"
            onClick={() => setSelectedKeys("upcoming-sprints")}
          >
            Upcoming Sprints
          </Menu.Item>
          <Menu.Item
            key="my-sprints"
            className="sub-menu-item-global-conference"
            onClick={() => setSelectedKeys("my-sprints")}
          >
            My Sprints
          </Menu.Item>
        </Menu>

        <p className="available-sprints">
          Available Sprints: {userProfile.simulationSprintsAvailable}
        </p>

        {selectedKeys === "general-information" ? (
          <GeneralInformation />
        ) : selectedKeys === "upcoming-sprints" ? (
          <UpcomingSprints />
        ) : (
          <MySprints />
        )}

        {selectedKeys !== "my-sprints" && (
          <PricesContainer
            handleBuySimulation={handleBuySimulation}
            loading={loading}
          />
        )}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulationSprintsPage);
