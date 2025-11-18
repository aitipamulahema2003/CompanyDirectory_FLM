const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const companies = require('./data/companies.json');
app.get('https://companydirectory-flm.onrender.com/api/companies', (req, res) => { res.json(companies); });
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
