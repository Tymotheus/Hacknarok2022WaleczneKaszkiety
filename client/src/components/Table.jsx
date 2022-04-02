import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

const Table = ({ data, columns, onRowClick }) => {
  return (
    <BootstrapTable bordered hover>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.path || column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => {
              if (column.renderCell) {
                return <td>{column.renderCell(item)}</td>;
              }
              return (
                <td
                  onClick={() => (onRowClick ? onRowClick(item) : null)}
                  key={column.path || column.key}
                >
                  {column.content ? column.content(item) : item[column.path]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
