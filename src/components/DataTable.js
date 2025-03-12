import React, { useMemo, useState } from "react";
import "./DataTable.css";

function DataTable() {
  const [data] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Diana Miller",
      email: "diana@example.com",
      status: "Active",
    },
  ]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Filtering state
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    status: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Handle filtering
  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    // Apply filters
    processedData = processedData.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return item[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });

    // Apply sorting
    processedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return processedData;
  }, [data, filters, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-container">
      {/* Filter inputs */}
      <div className="table-filters">
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange(e, "name")}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => handleFilterChange(e, "email")}
          className="filter-input"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange(e, "status")}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} className="sortable">
              ID{" "}
              {sortConfig.key === "id" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("name")} className="sortable">
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")} className="sortable">
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")} className="sortable">
              Status{" "}
              {sortConfig.key === "status" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td>#{row.id.toString().padStart(4, "0")}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>
                <span
                  className={`status-badge ${
                    row.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
