const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const request = require('request');

app.use(bodyParser.json());
const venmo = require('./modules/venmoHelper');

const PORT = process.argv[2] || 9000;
const LIMIT = 10000;
const CACHED = process.env.CACHE || false;
var START = 1477099020;
var STEPS = 10;

var cached;

router.route('/feed').get((req, res) => {
  if (CACHED) {
    console.log('CACHED version');
    if (!!cached) {
      console.log('loading cached');
      res.send(cached);
    } else {
      console.log('setting cached');
      request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          cached = body;
          res.send(body);
        }
      })
    }
  } else {
    request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    })
  }
});

router.route('/upload').post((req, res) => {
  console.log('req.body',req.body);

  res.end('works');
});

app.use('/api/', router);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`serving public on ${PORT}`);
});
