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




app.get('/', (req, res) => {
  res.render('index',{
    title:'Beer Site',
    message: '<i>Beer</i>'
  });
});

app.get('/admin/beer', (req, res) => {
  res.render('index',{
    title:'Beer Site'
  });
});



app.use(express.static('public'));



app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Serveren kører! http://localhost:' + port);
});