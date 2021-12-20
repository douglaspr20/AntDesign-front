import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutComponent = ({ options, data }) => {
  
  return (
    <>
      <Doughnut data={data} options={options}/>
    </>
  );
};

export default DoughnutComponent;
