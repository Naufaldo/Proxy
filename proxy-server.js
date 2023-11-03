const express = require('express');
const http = require('http');

const app = express();

app.use((req, res) => {
  const options = {
    hostname: '35.239.229.82',
    port: 80, // HTTP port
    path: '/api' + req.url, // Append the API path to the request
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Reverse proxy server is listening on port ${port}`);
});
