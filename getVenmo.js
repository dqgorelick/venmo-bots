var AWS = require('aws-sdk');
var request = require('request');

var s3 = new AWS.S3();

var LIMIT = 200;

function filterPayments(payments, cb) {
  var filtered = [];
  var timestamp;
  JSON.parse(payments).data.forEach((payment) => {
    if (!timestamp) {
      timestamp = payment.created_time;
      console.log('set timestamp');
    }
    filtered.push({ message: payment.message, timestamp: payment.created_time, id: payment.payment_id });
  });
  return cb(JSON.stringify({timestamp, filtered}));
}

exports.handler = (event, context, callback) => {
  console.log("s3");
  request(`https://venmo.com/api/v5/public?limit=${LIMIT}`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      filterPayments(body, (filtered) => {
        var param = { Bucket: 'venmostrips.com', Key: 'feed.json', Body: filtered};
        s3.upload(param, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data); // successful response
          }
          console.log('done!');
          context.done();
        });
      });
    }
  })
};
