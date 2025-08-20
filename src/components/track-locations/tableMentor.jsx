/* eslint-disable react/jsx-key */
import React from "react";
import Table from "../form/Table";

function TableMentor({ monitors_table }) {
  const headers = [
    {
      name: "الكود",
      style: { width: "100px" },
    },
    {
      name: "المركز",
      style: { width: "200px" },
    },

    {
      name: "اسم المراقب",
      style: { width: "80px" },
    },
  ];
  const rows = monitors_table?.map((monitor, index) => [
    monitor.code,
    <div>
      {monitor?.sectors.map((sector, index) => (
        <span
          key={index}
          className="badge "
          style={{ margin: "0 1px", backgroundColor: "#C9B171" }}
        >
          {sector}
        </span>
      ))}
    </div>,
    monitor.name,
  ]);
  return (
    <div>
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default TableMentor;
