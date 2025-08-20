import React from "react";
import Table from "../form/Table";

function TableSectors({ sectors_table }) {
  const headers = [
    {
      name: "المركز",
      style: { width: "50px" },
    },
    {
      name: "المتعهد",
    },
    {
      name: "الجنسية",
      style: { width: "70px" },
    },
    {
      name: "عدد الحجاج",
      style: { width: "100px" },
    },
  ];

  const rows = sectors_table?.map((item, index) => [
    item.label,
    item.facility_name,
    item.nationality,
    item.guest_quantity,

    // index + 1,
    // monitor.code,
  ]);

  return (
    <div className="my-4">
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default TableSectors;
