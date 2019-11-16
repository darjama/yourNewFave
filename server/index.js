const express = require('express');
const parser = require('body-parser');
const model = require('./model.js');
const app = express();

app.use(parser());

app.get('/faves' function (req, res) {
  model.getAllFaves((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    }
    res.status(200).send(data);
  }

  app.post('/faves' function (req, res) {
    model.addFave(req.body.artist, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.status(200).send(data);
    }

    app.put('/faves' function (req, res) {
      model.setRanking(req.query.ranking, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        res.status(200).send(data);
      }

    app.delete('/faves' function (req, res) {
      model.deleteFave(req.query.artist, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        res.status(200).send(data);
      }
})

app.listen(3003, () => {console.log('Servering on port 3003 ' + Date())} );

