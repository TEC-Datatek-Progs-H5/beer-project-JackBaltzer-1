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

app.get('/', (req, res) => {
  res.render('index', {
    message: '<i>Beer</i>',
    data: [1, 2, 3, 4, 5, 6, 7]
  });
});


app.post('/', (req, res) => {
  console.log(req.body);
  
  res.render('index', {
    message: '<i>Beer</i>',
    data: [1, 2, 3, 4, 5, 6, 7],
    beer: req.body
  });
});




app.get('/admin/beer', (req, res) => {
  res.render('index', {
    title: 'Beer Site'
  });
});



app.use(express.static('public'));



app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Serveren kører! http://localhost:' + port);
});