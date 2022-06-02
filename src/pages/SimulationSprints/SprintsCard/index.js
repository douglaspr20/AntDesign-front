import React from "react";
import { Button, Card } from "antd";

import "./style.scss";

const SprintsCard = ({ title, description, prices }) => {
  return (
    <Card className="simulation-sprints-card">
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="simulation-sprints-card-price-container">
        <h2>{prices}$</h2>
      </div>

      <div className="pay-button-container">
        <Button className="pay-buttton">Buy</Button>
      </div>
    </Card>
  );
};

export default SprintsCard;
