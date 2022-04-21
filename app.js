const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const logger = require('morgan');
app.use(logger('dev', {
  // hvis ALLE requests skal ses i loggen, kan næste linje udkommenteres
  skip: req => !req.url.endsWith(".html") && req.url.indexOf(".") > -1
}));

app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.locals.title = "beer";

const mongoose = require("mongoose");
// starter mongoDb og opretter forbindelsen til databasen, 
// også selv om variablen 'db' ikke benyttes
const db = mongoose.connect("mongodb://localhost:27017/ServersideScripting_2022_Q2");

const fileupload = require('express-fileupload');
app.use(fileupload({
   limits: {
      fileSize: 10 * 1024 * 1024
   } // 10mb
}));

require('./routes.js')(app);

app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Serveren kører! http://localhost:' + port);
});