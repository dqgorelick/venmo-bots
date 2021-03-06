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

const PORT = process.argv[2] || 9000;
const LIMIT = 10000;
const CACHED = process.env.CACHE || false;
var START = 1477099020;
var STEPS = 10;

var cached;


function filterPayments(payments, cb) {
  var filtered = [];
  JSON.parse(payments).data.forEach((payment) => {
    filtered.push({message: payment.message, timestamp: payment.created_time, id: payment.payment_id});
  });
  return cb(JSON.stringify(filtered));
}

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
          filterPayments(body, (filtered) => {
            cached = filtered;
            res.send(filtered);
          });
        }
      })
    }
  } else {
    request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        filterPayments(body, (filtered) => {
          res.send(filtered);
        });
      }
    })
  }
});

router.route('/save').post((req, res) => {
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
