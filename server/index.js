const express = require('express');
const parser = require('body-parser');
const model = require('./model.js');
const app = express();

app.use(parser.json());
app.use(express.static('public'));

app.get('/faves', function (req, res) {
  model.getAllFaves((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    }
    res.status(200).send(data);
  })
});

  app.post('/faves', function (req, res) {
    model.addFave(req.body.name, req.body.ranking, req.body.lastFmUrl, req.body.thumbnail, req.body.youTubeUrl, function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.send("data received");
    })
  });

    app.put('/rank', function (req, res) {
      model.setRanking(req.query.id, req.query.ranking, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        res.status(200).send(data);
      })
    });

    app.put('/note', function (req, res) {
      model.addNote(req.body.id, req.body.note, (err, data) => {

        if (err) {
          console.log(err);
          res.status(400).end();
        }
        res.status(200).send(data);
      })
    });

    app.delete('/faves/:id', function (req, res) {
      model.deleteFave(req.params.id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        res.status(200).send(data);
      })
    });


app.listen(3003, () => {console.log('Serving yourNewFave on port 3003 ' + Date())} );

