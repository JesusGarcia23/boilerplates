const http = require('http');
const express = require('express');


const app = express();
const port = 5000;

app.listen(port, console.log(`PORT LISTENING ON ${port}`))
