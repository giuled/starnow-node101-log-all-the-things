const express = require('express');
const fs = require('fs');
const app = express();
const logFile = require("./log.csv")

app.use((req, res, next) => {
// write your logging code here
var log = fs.createWriteStream("./log.csv");
console.log(req.headers["user-agent"]);
console.log(req._startTime);
console.log(req.method);
console.log(req.path);

fs.appendFile('log.csv', req.headers["user-agent"] + ", " + Date.now() + ", " + req.method + ", " + req.path, (err) => {
    if (err) throw err;
    console.log('worked');
  });

  res.json(logFile)
//   fs.readFile("./log.csv", function(err, data){
//     res.send(data);
// });
// res.send("end");
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send("ok");

});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
fs.readFile("./log.csv", function(err, data){
    res.send(data);
});

});

module.exports = app;
