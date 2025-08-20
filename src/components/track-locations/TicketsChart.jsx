import React, { useEffect, useState } from "react";
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
import chroma from "chroma-js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TicketsChart({ tickets_by_reason }) {
  const labels = tickets_by_reason?.map((item) => item.attribute);
  const dataValues = tickets_by_reason?.map((item) => item.count);

  const generateRandomColor = () => {
    return chroma.random().css();
  };
  const colors = labels?.map(() => generateRandomColor());
  const commonColor = "rgb(201, 177, 113)";

  const totalVotes = dataValues?.reduce((acc, value) => acc + value, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "القيمة",
        data: dataValues,
        backgroundColor: colors?.map((color) => chroma(color).alpha(0.9).css()),
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-1" style={{ height: "350px" }}>
      <Bar
        data={data}
        options={{
          indexAxis: "y",
          scales: {
            y: {
              ticks: {
                display: false,
                font: {
                  family: "IBM Plex Sans Arabic",
                  size: 12,
                },
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
            x: {
              ticks: {
                font: {
                  family: "IBM Plex Sans Arabic",
                  size: 10,
                },
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              align: "center",
              labels: {
                generateLabels: (chart) => {
                  const data = chart.data;
                  if (data?.labels?.length && data?.datasets?.length) {
                    return data?.labels?.map((label, index) => {
                      const value = data.datasets[0].data[index];
                      const percentage = ((value / totalVotes) * 100).toFixed(
                        1
                      );
                      return {
                        text: `${label}: ${value.toLocaleString()}`,
                        fillStyle: data.datasets[0].backgroundColor[index],
                        strokeStyle: data.datasets[0].borderColor[index],
                        lineWidth: data.datasets[0].borderWidth,
                        hidden: !chart.getDataVisibility(index),
                        index: index,
                        fontColor: isDarkMode ? "#ffffff" : "#000000",
                        fontFamily: "IBM Plex Sans Arabic",
                      };
                    });
                  }
                  return [];
                },
                color: isDarkMode ? "#ffffff" : "#000000",
                boxWidth: 15,
                boxHeight: 10,
                borderRadius: 10,
                padding: 10,
                font: {
                  size: 10,
                  family: "IBM Plex Sans Arabic",
                },
                usePointStyle: false,
              },
            },
            title: {
              display: false,
              font: {
                size: 15,
                family: "IBM Plex Sans Arabic",
              },
              color: isDarkMode ? "#ffffff" : "#000000",
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
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default TicketsChart;
