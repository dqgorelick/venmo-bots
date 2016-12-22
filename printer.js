const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const util = require('util');
const exec = require('child_process').exec;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.argv[2] || 9999;

router.route('/print').post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var dataURL = req.body.dataURL
  if(req.body.dataURL) {
    var base64Data = req.body.dataURL.replace(/^data:image\/png;base64,/, "");
    var fileName = `out.png`;
    fs.writeFile(fileName, base64Data, 'base64', function(err) {
      if(!err) {
        console.log('saved', fileName);
        if(process.env.PI) {
          console.log('printing yay');
          child = exec(`lpr -o fit-to-page ${fileName}`
            function (error, stdout, stderr) {
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
