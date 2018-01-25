"use strict";

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set('trust proxy', true)

app.get("/", (req, res) => {
  res.render('index.html.ejs');
});

app.get("/whoami", (req, res) => {

  let headers = req.headers;
  var ipaddress = req.ip;
  let language;
  let software;

  Object.keys(headers).forEach((key) => {
    if (key == "user-agent"){
      software = headers[key];
    } else if (key == "accept-language") {
      language = headers[key];
    }
  });

  language = language.split(",");

  // console.log("ipaddress ", ipaddress)
  // console.log("language ", language);
  // console.log("software ", software);

  const json = {
    "ipaddress": ipaddress,
    "language": language[0],
    "software": software
  };

  res.json(json);
});

const port = 3000;

app.listen(port, () => {
  console.log("Listening on 3000");
});