const keys = require('../keys.js');
const axios = require('axios');

exports.getYT = function(artist, callback){
  const ytKey = keys.YOUTUBEKEY;
  axios.get('https://www.googleapis.com/youtube/v3/search', { params: {
    part: 'snippet',
    key: ytKey,
    q: artist,
    maxResults: 1,
    type: 'video',
    videoEmbeddable: 'true'
  }}).then(data => {
    callback(null, data.data)
  })
  .catch(err => {
    console.log('ERROR!!!',err)
})
}

exports.getLFM = function(artist, callback) {
  const lfmKey = keys.LASTFMKEY;
  const url=`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${lfmKey}&format=json`;
  axios.get(url)
    .then(data =>{
      callback(null, data.data)})
    .catch(err => {
      console.log('ERROR!!!',err)
    });
}