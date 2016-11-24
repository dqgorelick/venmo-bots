const path = require('path');

const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');

const venmo = require('./modules/venmoHelper');
// const neo4j = require('./modules/neo4j');

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
            request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                cached = body;
                res.send(body);
              }
            })
        }
    } else {
        request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        })
    }
});

router.route('/gather').get((req, res) => {
    for (var key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
    }
    console.log('START',req.query.start);
    console.log('STEPS',req.query.steps);

    START = START || req.query.start;
    STEPS = STEPS || req.query.steps;

    var options = {
        start: START,
        steps: STEPS
    };



    venmo.request(options, () => {

    });
});


// neo4j.upload();

app.use('/api/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`serving public on ${PORT}`);
});
