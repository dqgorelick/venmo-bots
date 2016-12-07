const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const moment = require('moment');

app.use(bodyParser.json());

const PRINT_PORT = process.argv[2] || 9999;

router.route('/upload').post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var dataURL = req.body.dataURL
  if(req.body.dataURL) {
    var base64Data = req.body.dataURL.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('to_print.png', base64Data, 'base64', function(err) {
      if(!err) {
        console.log('saved', 'to_print.png');
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
app.listen(PRINT_PORT, () => {
  console.log(`serving printer on public on ${PRINT_PORT}`);
});
