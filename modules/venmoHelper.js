const request = require('request');

var LIMIT = 10000;
var SINCE = 1477099020;
var UNTIL = SINCE + 60;

const VENMO_API = `https://venmo.com/api/v5/public?limit=${LIMIT}&since=${SINCE}&until=${UNTIL}`;

exports.request = (options, cb) => {
    request(VENMO_API, function (error, response, body) {

    });
}


