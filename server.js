const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const request = require('request');
const moment = require('moment');

const util = require('util');
const exec = require('child_process').exec;

app.use(bodyParser.json());
const venmo = require('./modules/venmoHelper');

const PORT = process.argv[2] || 9000;
const LIMIT = 10000;
const CACHED = process.env.CACHE || false;
var START = 1477099020;
var STEPS = 10;

var cached;

router.route('/feed').get((req, res) => {
  console.log('requested!');
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

router.route('/save').post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var dataURL = req.body.dataURL
  if(req.body.dataURL) {
    var toSend = JSON.stringify({dataURL: dataURL})
    var options = {
      uri: 'http://192.168.1.96:9999/api/print',
      method: 'POST',
      body: toSend,
      headers: {
          "content-type": "application/json",
      }
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log('error',error);
      }
    });
    var base64Data = req.body.dataURL.replace(/^data:image\/png;base64,/, "");
    var fileName = `./created_images/${moment().format()}_rendered.png`;
    fs.writeFile(fileName, base64Data, 'base64', function(err) {
      if(!err) {
        console.log('saved', fileName);
        res.send('saved to server!');
      } else {
        console.log('err',err);
        res.send('did not work');
      }
    });
  }
});


app.use('/api/', router);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`serving public on ${PORT}`);
});
