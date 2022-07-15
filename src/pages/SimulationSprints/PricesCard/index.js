import React from "react";
import { Button, Card } from "antd";

import "./style.scss";

const PricesCard = ({
  title,
  description,
  prices,
  handleBuySimulation,
  loading,
}) => {
  return (
    <Card className="sprints-prices-card">
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="sprints-prices-card-price-container">
        <h2>{prices}</h2>
      </div>

      <div className="pay-button-container">
        <Button
          className="pay-buttton"
          onClick={() => handleBuySimulation()}
          loading={loading}
        >
          Buy
        </Button>
      </div>
    </Card>
  );
};

export default PricesCard;
