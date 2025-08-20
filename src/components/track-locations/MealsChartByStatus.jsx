import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function MealsChartByStatus({ isDarkMode, meals_by_status }) {
  const labels = meals_by_status?.map((item) => item.attribute);
  const dataValues = meals_by_status?.map((item) => item.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# العدد",
        data: dataValues,
        backgroundColor: ["#e29697", "#65cb66", "#399ddd"],
        borderColor: ["#e29697", "#65cb66", "#399ddd"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          color: isDarkMode ? "#ffffff" : "#000",
          font: {
            family: "IBM Plex Sans Arabic",
          },
        },
      },
      title: {
        display: true,
        text: "حسب الحالة",
        color: isDarkMode ? "#ffffff" : "#000",
        font: {
          family: "IBM Plex Sans Arabic",
          size: 14,
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        footerColor: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000",
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000",
        },
      },
    },
    layout: {
      padding: {
        left: 90,
        right: 90,
        top: 90,
        bottom: 90,
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default MealsChartByStatus;
