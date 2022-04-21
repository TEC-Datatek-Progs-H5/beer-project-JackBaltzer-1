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
      let beers = await Beer.find();
      // HER ER DER SKET FEJL
      res.render('beerAdmin', {
        message: message.join(', '),
        beer: req.body,
        beers
      });
    } else {
      // INDSÆT I DB
      await Beer.create(req.body);
      res.redirect('/admin/beer');
    }
  });

  app.get('/admin/beer/edit/:beerId', (req, res) => {
    Beer.findById(req.params.beerId, async (err, beer) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admin/beer');
      } else {
        let beers = await Beer.find();
        res.render('beerAdmin', {
          beers,
          beer,
          title: 'Beer Site'
        });
      }
    });
  });

  app.post('/admin/beer/edit/:beerId', async (req, res) => {
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
      let beers = await Beer.find();
      // HER ER DER SKET FEJL
      res.render('beerAdmin', {
        message: message.join(', '),
        beer: req.body,
        beers
      });
    } else {
      // INDSÆT I DB
      await Beer.findByIdAndUpdate(req.params.beerId, req.body);
      res.redirect('/admin/beer');
    }
  });

  app.get('/admin/beer/delete/:beerId', async (req, res) => {
    await Beer.findByIdAndDelete(req.params.beerId);
    res.redirect('/admin/beer');
  });
}