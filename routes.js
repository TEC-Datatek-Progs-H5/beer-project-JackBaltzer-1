const Beer = require('./models/beerModel');
const fs = require('fs');


async function getAllBeers() {
  return await Beer.find()
    .collation({
      locale: 'da'
    })
    .sort({
      'name': 'asc'
    })
}

module.exports = (app) => {
  app.get('/', async (req, res) => {
    let beers = await getAllBeers();
    res.render('index', {
      beers
    });
  });

  app.get('/admin/beer', async (req, res) => {
    let beers = await getAllBeers();
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
      message.push('udfyld farve');
    }
    if (req.body.year == undefined || parseInt(req.body.year) == 0) {
      message.push('Vælg år');
    }

    if (message.length > 0) {
      let beers = await getAllBeers();
      // HER ER DER SKET FEJL
      res.render('beerAdmin', {
        message: message.join(', '),
        beer: req.body,
        beers
      });
    } else {
      // INDSÆT I DB
      if (req.files != undefined && req.files.image != '') {
        let file = req.files.image;
        await file.mv('./public/images/' + file.name);
        req.body.image = file.name;
      }

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
        let beers = await getAllBeers();
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
      let beers = await getAllBeers();
      // HER ER DER SKET FEJL
      res.render('beerAdmin', {
        message: message.join(', '),
        beer: req.body,
        beers
      });
    } else {
      // INDSÆT I DB
      if (req.files != undefined && req.files.image != '') {
        // slet det oprindelige billede, hvis et ny uploades under edit
        let beer = await Beer.findById(req.params.beerId);
        if (beer.image != null && beer.image != '') {
          if (fs.existsSync('./public/images/' + beer.image)) {
            fs.unlinkSync('./public/images/' + beer.image);
          }
        }
        let file = req.files.image;
        await file.mv('./public/images/' + file.name);
        req.body.image = file.name;
      }

      await Beer.findByIdAndUpdate(req.params.beerId, req.body);
      res.redirect('/admin/beer');
    }
  });

  app.get('/admin/beer/delete/:beerId', async (req, res) => {
    let beer = await Beer.findById(req.params.beerId);
    if (beer.image != null && beer.image != '') {
      if (fs.existsSync('./public/images/' + beer.image)) {
        fs.unlinkSync('./public/images/' + beer.image);
      }
    }
    await Beer.findByIdAndDelete(req.params.beerId);
    res.redirect('/admin/beer');
  });
}