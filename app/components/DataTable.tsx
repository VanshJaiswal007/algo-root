"use client";
import { useState } from "react";
import { mockData } from "../data/mockData";

export default function DataTable() {
  const [data, setData] = useState(mockData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Sorting function
  const sortTable = (column: keyof (typeof mockData)[0]) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Search function
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black"
      />

      <table className="w-full border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th
              className="border border-gray-400 p-2 cursor-pointer"
              onClick={() => sortTable("name")}
            >
              Name {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th
              className="border border-gray-400 p-2 cursor-pointer"
              onClick={() => sortTable("email")}
            >
              Email {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th
              className="border border-gray-400 p-2 cursor-pointer"
              onClick={() => sortTable("role")}
            >
              Role {sortOrder === "asc" ? "▲" : "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } hover:bg-gray-400`}
            >
              <td className="border border-gray-300 p-2">{row.name}</td>
              <td className="border border-gray-300 p-2">{row.email}</td>
              <td className="border border-gray-300 p-2">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastRow < filteredData.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastRow >= filteredData.length}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

