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

app.get('/api/opensearch', async (req, res) => {
  try {
    const response = await axios.get(OPENSEARCH_URL, {
      auth: AUTH,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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



app.get('/api/indices', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${OPENSEARCH_URL}/_cat/indices?v&expand_wildcards=all`,
      {
        auth: AUTH,
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false // For self-signed certs
        })
      }
    );

    res.type('text/plain'); // Because _cat APIs return plain text
    res.send(data);
  } catch (err) {
    console.error('Error fetching indices:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
