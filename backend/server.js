const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');
const fieldsRoutes = require('./routes/fieldsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', searchRoutes);
app.use('/api', fieldsRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
