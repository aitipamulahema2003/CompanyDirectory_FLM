import React from 'react'

export default function CompanyList({ companies }) {
  if (!companies.length) return <div className="info">No companies found.</div>

  return (
    <div className="grid">
      {companies.map(c => (
        <article key={c.id} className="card">
          <h3>{c.name}</h3>
          <div className="meta">{c.industry} • {c.location}</div>
          <div className="details">
            <div><strong>Employees:</strong> {c.employees}</div>
            <div><strong>Founded:</strong> {c.founded}</div>
          </div>
        </article>
      ))}
    </div>
  )
}
