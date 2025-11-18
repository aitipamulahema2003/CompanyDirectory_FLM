import React from 'react'

export default function Filters({ query, setQuery, locations, locationFilter, setLocationFilter, industries, industryFilter, setIndustryFilter, sort, setSort }) {
  return (
    <div className="filters">
      <input placeholder="Search" value={query} onChange={e=>setQuery(e.target.value)} />
      <select value={locationFilter} onChange={e=>setLocationFilter(e.target.value)}>
        {locations.map(v=> <option key={v}>{v}</option>)}
      </select>
      <select value={industryFilter} onChange={e=>setIndustryFilter(e.target.value)}>
        {industries.map(v=> <option key={v}>{v}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="name_asc">Name ▲</option>
        <option value="name_desc">Name ▼</option>
      </select>
    </div>
  )
}
