// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//endpoints

const timestamp = (date) => {
  let unixDate = date.getTime();
  let utcDate = date.toUTCString();

  return { unix: unixDate, utc: utcDate };
};

app.get("/api/:date", (req, res) => {
  let date = new Date(req.params.date);

  if (date.toUTCString() === "Invalid Date") {
    date = new Date(+req.params.date);
    if (date.toUTCString() === "Invalid Date")
      res.send({ error: "Invalid Date" });
  }

  res.send(timestamp(date));
});

app.get("/api/", (req, res) => {
  res.send(timestamp(new Date()));
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
