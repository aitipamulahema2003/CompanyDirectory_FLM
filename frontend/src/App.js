import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import CompanyList from "./components/CompanyList";
import "./App.css";
function App() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then(res => res.json())
      .then(data => { setCompanies(data); setFiltered(data); });
  }, []);
  const onFilterChange = (filters) => {
    let result = companies;
    if (filters.search) {
      result = result.filter(c => c.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.location) { result = result.filter(c => c.location === filters.location); }
    if (filters.industry) { result = result.filter(c => c.industry === filters.industry); }
    setFiltered(result);
  };
  return (
    <div className="container">
      <h2>Companies Directory</h2>
      <Filters companies={companies} onFilterChange={onFilterChange} />
      <CompanyList companies={filtered} />
    </div>
  );
}
export default App;
