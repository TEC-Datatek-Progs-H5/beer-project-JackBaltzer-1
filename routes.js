const Beer = require('./models/beerModel');

module.exports = (app) => {

  app.get('/', async (req, res) => {



    let beers = await Beer.find();
    res.render('index', {
      beers,
      message: '<i>Beer</i>',
      data: [1, 2, 3, 4, 5, 6, 7]
    });
  });

  app.post('/', async (req, res) => {

    let message = [];
    if (req.body.beerName == undefined || req.body.beerName == '') {
      message.push('Udfyld navn');
    }
    if (req.body.beerType == undefined || req.body.beerType == '') {
      message.push('vælg øltype');
    }
    if (req.body.color == undefined || req.body.color == '') {
      message.push('udflyd farve');
    }

    if (message.length > 0) {
      // HER ER DER SKET FEJL
      res.render('index', {
        message: message.join(', '),
        data: [1, 2, 3, 4, 5, 6, 7],
        beer: req.body
      });
    } else {
      // INDSÆT I DB
      await Beer.create({
        name: req.body.beerName,
        color: req.body.color,
        type: req.body.beerType
      });
      res.redirect('/');
    }




  });

  app.get('/admin/beer', async (req, res) => {
    let beers = await Beer.find();
    res.render('beerAdmin', {
      beers,
      title: 'Beer Site'
    });
  });

  app.post('/admin/beer', async (req, res) => {
    let message = [];
    if (req.body.name == undefined || req.body.name == '') {
      message.push('Udfyld navn');
    }
    if (req.body.type == undefined || req.body.type == '') {
      message.push('vælg øltype');
    }
    if (req.body.color == undefined || req.body.color == '') {
      message.push('udflyd farve');
    }

    if (message.length > 0) {
      // HER ER DER SKET FEJL
      res.render('index', {
        message: message.join(', '),
        data: [1, 2, 3, 4, 5, 6, 7],
        beer: req.body
      });
    } else {
      // INDSÆT I DB
      await Beer.create({
        name: req.body.name,
        color: req.body.color,
        type: req.body.type
      });
      res.redirect('/admin/beer');
    }
  });

  app.get('/admin/beer/edit/:beerId',  (req, res) => {
    Beer.findById(req.params.beerId, async (err, beer) => {
      if(err){
        console.log(err.message);
        res.redirect('/admin/beer');
      }else{
        let beers = await Beer.find();
        res.render('beerAdmin', {
          beers,
          beer,
          title: 'Beer Site'
        });
      }
    });
  });

}