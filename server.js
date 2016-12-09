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

const RASPBERRY_PI_IP = '192.168.1.96:9000';

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

router.route('/upload').post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var dataURL = req.body.dataURL
  if(req.body.dataURL) {
    var base64Data = req.body.dataURL.replace(/^data:image\/png;base64,/, "");
    var fileName = `./created_images/${moment().format()}_rendered.png`;
    fs.writeFile(fileName, base64Data, 'base64', function(err) {
      if(!err) {
        console.log('saved', fileName);
        if(process.env.PI) {
          console.log('printing yay');
          child = exec(`lpr -o fit-to-page ${fileName}`, // command line argument directly in string
            function (error, stdout, stderr) {      // one easy function to capture data/errors
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null) {
                console.log('exec error: ' + error);
              }
          });
        } else {
          console.log('not on the pi');
        }
        res.send('works!');
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
