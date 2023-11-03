const express = require('express');
const https = require('https'); // Use the 'https' module for HTTPS requests
const cors = require('cors'); // Import the cors middleware

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use((req, res) => {
  const options = {
    hostname: '35.239.229.82',
    port: 80, // Use port 80 for HTTP
    path: '/api' + req.url, // Append the API path to the request
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = https.request(options, (proxyRes) => { // Use 'https' for the proxy request
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Reverse proxy server is listening on port ${port}`);
});
