import React, { useState } from "react";
export default function Filters({ companies, onFilterChange }) {
  const [filters, setFilters] = useState({ search: "", location: "", industry: "" });
  const locations = [...new Set(companies.map(c => c.location))];
  const industries = [...new Set(companies.map(c => c.industry))];
  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  return (
    <div className="filters">
      <input type="text" placeholder="Search by name..." name="search" value={filters.search} onChange={handleChange} />
      <select name="location" onChange={handleChange}>
        <option value="">Location</option>
        {locations.map(loc => (<option key={loc}>{loc}</option>))}
      </select>
      <select name="industry" onChange={handleChange}>
        <option value="">Industry</option>
        {industries.map(ind => (<option key={ind}>{ind}</option>))}
      </select>
    </div>
  );
}
