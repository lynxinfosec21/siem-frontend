const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const OPENSEARCH_URL = 'http://localhost:9200';
const AUTH = {
  username: 'admin',
  password: 'Orthorhombic777!',
};


app.post('/api/search', async (req, res) => {
  const { index, query } = req.body;

  if (!index || !query) {
    return res.status(400).json({ error: 'Missing index or query in request body' });
  }

  try {
    const { data } = await axios.post(
      `${OPENSEARCH_URL}/${index}/_search`,
      query,
      {
        auth: AUTH,
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
      }
    );

    res.json(data);
  } catch (err) {
    console.error('🔴 Error Message:', err.message);
    console.error('🔴 Error Stack:', err.stack);
    if (err.response) {
      console.error('🔴 Response Data:', err.response.data);
    }
    res.status(500).json({ error: err.message });
  }
});


// Helper to recursively flatten mapping properties
function extractFields(properties, prefix = '') {
  let fields = [];
  for (const key in properties) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (properties[key].properties) {
      fields = fields.concat(extractFields(properties[key].properties, path));
    } else {
      fields.push(path);
    }
  }
  return fields;
}

// Endpoint to get all available fields for top* indices
app.get('/api/fields', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${OPENSEARCH_URL}/top*/_mapping`,
      {
        auth: AUTH,
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
      }
    );
    let allFields = new Set();
    for (const index of Object.values(data)) {
      if (index.mappings && index.mappings.properties) {
        extractFields(index.mappings.properties).forEach(f => allFields.add(f));
      }
    }
    res.json(Array.from(allFields));
  } catch (err) {
    console.error('Error fetching fields:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
