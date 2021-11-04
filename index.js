'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`
<h1>Hello from MyService 2021-11-04 23:09</h1>
<pre>${JSON.stringify(process.env, null, 2)}</pre>

`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
