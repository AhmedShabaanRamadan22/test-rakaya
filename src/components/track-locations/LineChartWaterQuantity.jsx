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

function LineChartWaterQuantity({
  isDarkMode,
  supports_water_by_day_quantity,
}) {
  const labelsByFood = supports_water_by_day_quantity?.map((item) => item.date);
  const dataValuesByFood = supports_water_by_day_quantity?.map(
    (item) => item.sum
  );

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

  const labels = labelsByFood;

  const data = {
    labels,
    datasets: [
      {
        label: "عدد الوجبات المسلمة من الاسناد",
        data: dataValuesByFood,
        borderColor: "rgb(201, 177, 113)",
        backgroundColor: "rgb(201, 177, 113)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChartWaterQuantity;
