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
  thumbnail: String,
  youTubeUrl: String,
  note: String,
})

const ArtistModel = mongoose.model('Artists', Artist);

const getAllFaves = function(callback) {
  ArtistModel.find({}).sort([['ranking', 'ascending']]).exec((err, docs) => {
    callback(err, docs);
  });
}

const addFave = function(name, ranking, lastFmUrl, thumbnail, youTubeUrl, callback) {
  const newFave = new ArtistModel({
    name, ranking, lastFmUrl, thumbnail, youTubeUrl
  });
  newFave.save((err) => {
    callback(err);
  })
}

const deleteFave = function(id, callback) {
  ArtistModel.deleteOne({_id: id}, (err, docs) => {
    if (err) {
      throw new Error(err);
    } else {
      callback(null, docs);
    }
  })
}

const modFave = function(_id, note, callback) {
  ArtistModel.updateOne({ _id }, { note }, (err, docs) => {
    callback(err, docs);
  })
}

module.exports.getAllFaves = getAllFaves;
module.exports.addFave = addFave;
module.exports.deleteFave = deleteFave;
module.exports.modFave = modFave;
