import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({
  isDarkMode,
  supports_food_by_day,
  supports_water_by_day,
}) {
  const labelsByFood = supports_food_by_day?.map((item) => item.date);
  const dataValuesByFood = supports_food_by_day?.map((item) => item.count);

  const labelsByWater = supports_water_by_day?.map((item) => item.date);
  const dataValuesByWater = supports_water_by_day?.map((item) => item.count);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        color: isDarkMode ? "#ffffff" : "#000",
        labels: {
          color: isDarkMode ? "#ffffff" : "#000",
          font: {
            size: 12,
            family: "IBM Plex Sans Arabic",
          },
        },
      },
      title: {
        display: true,
        color: isDarkMode ? "#ffffff" : "#000",
        font: {
          size: 16,
          family: "IBM Plex Sans Arabic",
        },
      },
      tooltip: {
        titleFont: {
          family: "IBM Plex Sans Arabic",
        },
        bodyFont: {
          family: "IBM Plex Sans Arabic",
        },
        footerFont: {
          family: "IBM Plex Sans Arabic",
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        footerColor: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000",
          font: {
            family: "IBM Plex Sans Arabic",
            size: 12,
            color: isDarkMode ? "#ffffff" : "#000",
          },
        },
      },
      y: {
        ticks: {
          stepSize: 100,
          color: isDarkMode ? "#ffffff" : "#000",
          font: {
            family: "IBM Plex Sans Arabic",
            size: 12,
            color: isDarkMode ? "#ffffff" : "#000",
          },
        },
      },
    },
  };

  const labels =
    labelsByFood?.length > labelsByWater?.length ? labelsByFood : labelsByWater;

  const data = {
    labels,
    datasets: [
      {
        label: "الوجبات",
        data: dataValuesByFood,
        borderColor: "rgb(201, 177, 113)",
        backgroundColor: "rgb(201, 177, 113)",
      },
      {
        label: "المياه",
        data: dataValuesByWater,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
