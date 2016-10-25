const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');

const PORT = process.argv[2] || 9000;

// max amount you can return is 1334
const VENMO_API = 'https://venmo.com/api/v5/public?limit=1334';


// create route for making request to venmo
router.route('/feed').get(function(req, res) {
    request(VENMO_API, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    })
});

app.use('/api/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`serving public on ${PORT}`);
});
