import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TicketDangerChart({ isDarkMode, tickets_by_danger }) {
  const labels = tickets_by_danger?.map((item) => item.attribute);
  const dataValues = tickets_by_danger?.map((item) => item.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# العدد",
        data: dataValues,
        backgroundColor: ["#EE6363" ," #f0c24c",  "#F0A44B"],
        borderColor: ["#EE6363" ," #f0c24c",  "#F0A44B"],
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
          color: isDarkMode ? "white" : "black",
          font: {
            family: "IBM Plex Sans Arabic",
          },
        },
      },
      title: {
        display: true,
        text: "حسب الخطورة",
        color: isDarkMode ? "white" : "black",
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        footerColor: "#ffffff",
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

export default TicketDangerChart;
