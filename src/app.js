const express = require('express');
const request = require('supertest');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();

//logging
app.use(morgan('tiny', {
  stream: fs.createWriteStream(path.join(__dirname, './API.log'))
}))


//GET Route
app.get("/whattimeisit", (req, res) => {
  
const timeObject = new Date();
const militaryHour = timeObject.getHours();
const minutes = timeObject.getMinutes();
let currentTime;

if (militaryHour > 12) {
  currentTime = `${militaryHour - 12}:${minutes} PM`
}
else {
  currentTime =  `${militaryHour}:${minutes} AM`
}

res.send(currentTime);
});


//test for GET request
request(app)
  .get('/whattimeisit').expect(200)
  .end((err) => {
    if (err) throw err;
  });




module.exports = app;
