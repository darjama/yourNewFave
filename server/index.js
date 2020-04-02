const express = require('express');
const apicache = require('apicache');
const parser = require('body-parser');
const model = require('./model.js');
const apiRoutes = require('./apiRoutes.js');
const app = express();
var cache = apicache.options({trackPerformance: true}).middleware;

app.use(parser.json());
app.use(express.static('public'));

app.set("json spaces", 2);

app.get('/api/cache/index', function(req,res){
  res.send(apicache.getIndex())
})
app.get('/api/cache/performance', (req, res) => {
  res.json(apicache.getPerformance())
})

app.get('/api/youtube/:artist', cache('30 minutes'), function(req,res) {
  apiRoutes.getYT(req.params.artist, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
      console.log(data.items);
    res.status(200).send(data);
    }
  })
})

app.get('/api/lastfm/:artist', cache('30 minutes'), function(req,res) {
  apiRoutes.getLFM(req.params.artist, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
    res.status(200).send(data);
    }
  })
})


app.get('/faves', function (req, res) {
  model.getAllFaves((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
    res.status(200).send(data);
    }
  })
});

  app.post('/faves', function (req, res) {
    model.addFave(req.body.name, req.body.ranking, req.body.lastFmUrl, req.body.thumbnail, req.body.youTubeUrl, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send({message: 'new fave added'});
      }
    })
  });

    app.put('/faves', function (req, res) {
      model.modFave(req.body.id, req.body.note, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        } else {
        res.status(200).send(data);
      }
      })
    });


    app.delete('/faves/:id', function (req, res) {
      model.deleteFave(req.params.id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        } else {
          res.status(200).send(data);
        }
      })
    });


app.listen(3003, () => {console.log('Serving yourNewFave on port 3003 ' + Date())} );

