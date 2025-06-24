const axios = require('axios');
const https = require('https');
const { OPENSEARCH_URL, AUTH } = require('../utils/config');

exports.searchController = async (req, res) => {
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
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
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
}; 