import React from "react";
import PricesCard from "../PricesCard";

const PricesContainer = ({ handleBuySimulation, loading }) => {
  const prices = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(number);
  };

  return (
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
  );
};

export default PricesContainer;
