const fs = require('fs');

exports.createJson = (timestamp, json) => {
    fs.writeFile(`${timestamp}.json`, json, (err) => {
        if (!err) {
            console.log(`wrote ${timestamp} to file`);
        }
    });
}

