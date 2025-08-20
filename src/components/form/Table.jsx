import React from "react";

function Table({ headers, rows }) {
  return (
    <div>
      <table className="table m-0" style={{ width: "100%", margin: "0" }}>
        <thead>
          <tr className="header_table" style={{ textAlign: "center" }}>
            {headers.map((header, index) => (
              <th
                scope="col"
                style={{ ...header?.style, color: "white" }}
                key={index}
              >
                {header?.name}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
        className="filter-container"
      >
        <table className="table" style={{ width: "100%", margin: "0" }}>
          <tbody>
            {rows?.map((row, rowIndex) => (
              <tr
                style={{ textAlign: "center", width: "116px" }}
                key={rowIndex}
              >
                {row?.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
