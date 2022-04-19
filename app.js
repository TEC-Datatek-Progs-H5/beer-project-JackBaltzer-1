const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const logger = require('morgan');
app.use(logger('dev', {
  // hvis ALLE requests skal ses i loggen, kan næste linje udkommenteres
  skip: req => !req.url.endsWith(".html") && req.url.indexOf(".") > -1
}));




app.get('/', (req, res) => {
  res.send('<h1>Hello World, it\'s sunny!!!!!</h1>');
});

app.get('/admin/beer', (req, res) => {
  res.send('<h1>Hello World, it\'s sunny!!!!!</h1>');
});


app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Serveren kører! http://localhost:' + port);

});