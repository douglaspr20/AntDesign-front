import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "What best defines your current or most recent job level?",
    },
  },
};

const labels = [
  "C-Suite",
  "VP or SVP",
  "Director",
  "Manager",
  "Professional",
  "Junior",
];


export default function VerticalBar({ users }) {
  const cSuite = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "C-Suite") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  const vPOrSvp = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "VP or SVP") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  const director = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "Director") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  const manager = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "Manager") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  const professional = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "Professional") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  const junior = users.reduce((previousValue, currentValue) => {
    if (currentValue.recentJobLevel === "Junior") {
      previousValue += 1;
    }

    return previousValue;
  }, 0);

  console.log(cSuite, vPOrSvp, director, manager, professional, junior, 'bruh')

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [cSuite, vPOrSvp, director, manager, professional, junior, 7],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
