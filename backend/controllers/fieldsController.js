const axios = require("axios");
const https = require("https");
const { OPENSEARCH_URL, AUTH } = require("../utils/config");
require("dotenv").config("../.env");

// Helper to recursively flatten mapping properties
function extractFields(properties, prefix = "") {
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

exports.fieldsController = async (req, res) => {
  try {
    const { data } = await axios.get(`${OPENSEARCH_URL}/top*/_mapping`, {
      auth: {
        username: process.env.OPENSEARCH_AUTH_USERNAME,
        password: process.env.OPENSEARCH_AUTH_PASSWORD,
      },
      headers: { "Content-Type": "application/json" },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    let allFields = new Set();
    for (const index of Object.values(data)) {
      if (index.mappings && index.mappings.properties) {
        extractFields(index.mappings.properties).forEach((f) =>
          allFields.add(f)
        );
      }
    }
    res.json(Array.from(allFields));
  } catch (err) {
    console.error("Error fetching fields:", err.message);
    res.status(500).json({ error: err.message });
  }
};
