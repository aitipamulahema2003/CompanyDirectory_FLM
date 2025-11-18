import React, { useEffect, useMemo, useState } from 'react'
import CompanyList from './components/CompanyList'
import Filters from './components/Filters'

export default function App() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [industryFilter, setIndustryFilter] = useState('All')
  const [sort, setSort] = useState('name_asc')
  const [page, setPage] = useState(1)
  const pageSize = 6

  useEffect(() => {
    fetch('/companies.json')
      .then(res => res.json())
      .then(setCompanies)
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false))
  }, [])

  const locations = useMemo(() => ['All', ...new Set(companies.map(c => c.location))], [companies])
  const industries = useMemo(() => ['All', ...new Set(companies.map(c => c.industry))], [companies])

  const filtered = useMemo(() => {
    let list = companies.slice()
    if (query) list = list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    if (locationFilter !== 'All') list = list.filter(c => c.location === locationFilter)
    if (industryFilter !== 'All') list = list.filter(c => c.industry === industryFilter)

    if (sort === 'name_asc') list.sort((a,b)=> a.name.localeCompare(b.name))
    if (sort === 'name_desc') list.sort((a,b)=> b.name.localeCompare(a.name))

    return list
  }, [companies, query, locationFilter, industryFilter, sort])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize)

  return (
    <div className="container">
      <header><h1>Companies Directory</h1></header>

      <Filters query={query} setQuery={setQuery}
        locations={locations} locationFilter={locationFilter} setLocationFilter={setLocationFilter}
        industries={industries} industryFilter={industryFilter} setIndustryFilter={setIndustryFilter}
        sort={sort} setSort={setSort}
      />

      {loading && <div className="info">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && <>
        <CompanyList companies={paginated} />

        <div className="pagination">
          <button onClick={()=>setPage(p=>p-1)} disabled={page===1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={()=>setPage(p=>p+1)} disabled={page===totalPages}>Next</button>
        </div>
      </>}
    </div>
  )
}
