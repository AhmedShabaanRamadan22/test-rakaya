import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function SectorsChart({ orderSector }) {
  const labels = orderSector.map(sector => sector.order_sector_name);

  const data = {
    labels:labels,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
        ],
        borderColor: [
            "rgb(201, 177, 113)",
            "rgb(201, 177, 113)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
}

export default SectorsChart;
