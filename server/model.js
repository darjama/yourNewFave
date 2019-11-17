const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/favemusic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Artist = new Schema ({
  name: { type: String, unique: true, index: true },
  ranking: String,
  lastFmUrl: String,
  Thumbnail: String,
  youTubeUrl: String,
  note: String,
})

const ArtistModel = mongoose.model('Artists', Artist);

const getAllFaves = function(callback) {
  ArtistModel.find({}).sort([['ranking', 'ascending']]).exec((err, docs) => {
    callback(err, docs);
  });
}

const addFave = function(name, ranking, lastFmUrl, Thumbnail, youTubeUrl, callback) {
  const newFave = new ArtistModel({
    name, ranking, lastFmUrl, Thumbnail, youTubeUrl
  });
  newFave.save((err) => {
    callback(err);
  })
}

const deleteFave = function(id, callback) {
  ArtistModel.deleteOne({_id: id}, (err, docs) => {
    callback(err, docs);
  })
}

const setRanking = function(_id, ranking, callback) {
  ArtistModel.updateOne({ _id }, { ranking }, (err, docs) => {
    callback(err, docs);
  })
}

const addNote = function(_id, note, callback) {
  ArtistModel.updateOne({ _id }, { note }, (err, docs) => {
    callback(err, docs);
  })
}

module.exports.getAllFaves = getAllFaves;
module.exports.addFave = addFave;
module.exports.deleteFave = deleteFave;
module.exports.setRanking = setRanking;
module.exports.addNote = addNote;