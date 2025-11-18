export default function CompanyList({ companies }) {
  return (
    <table className="company-table">
      <thead><tr><th>Name</th><th>Location</th><th>Industry</th></tr></thead>
      <tbody>
        {companies.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.location}</td>
            <td>{c.industry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
