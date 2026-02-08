const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

// For SPA routing, always serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Production server running at http://localhost:${PORT}`);
});
