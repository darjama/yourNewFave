import React from 'react';
import axios from 'axios';
import keys from  '../keys.js';
import FmList from './fmList.js';
import FaveList from './faveList.js';
import Search from './search.js'
// import VideoPlayer from './VideoPlayer.js';
// import Search from './Search.js';
// import ArtistDetails from './ArtistDetails.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faves: [],
      lastFmResults: [],
    };
    this.getLastFmList = this.getLastFmList.bind(this);
    this.addFave = this.addFave.bind(this);
    this.deleteFave = this.deleteFave.bind(this);
    this.getFaves = this.getFaves.bind(this);
    // this.addNote = this.addNote.bind(this);
    this.getYouTubeList = this.getYouTubeList.bind(this);
  }

  componentDidMount() {
    this.getLastFmList('rick astley');
    this.getFaves();
  }

  getYouTubeList(artist) {
    const ytKey = keys.YOUTUBEKEY;
    axios.get('https://www.googleapis.com/youtube/v3/search', { params: {
      part: 'snippet',
      key: ytKey,
      q: artist,
      maxResults: 1,
      type: 'video',
      videoEmbeddable: 'true'
    }})
    .then(ytData => {
      console.log(ytData);
      const lastFmTemp = this.state.lastFmResults;
      for(var i = 0; i < lastFmTemp.length; i ++) {
        if (lastFmTemp[i].name === artist) {
          lastFmTemp[i].thumbnail = ytData.data.items[0].snippet.thumbnails.default.url;
          lastFmTemp[i].youTubeUrl = ytData.data.items[0].id.videoId;
          break;
        }
      }
      this.setState({
        lastFmResults: lastFmTemp
      })
    })
    .catch( (error) => {
      // handle error
      console.log(error);
    })
    .finally( () => {
       console.log(this.state.lastFmResults);
    });
  }

  getLastFmList(artist, callback) {
    const lfmKey = keys.LASTFMKEY;
    const url=`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${lfmKey}&format=json`;
    axios.get(url)
    .then( lfmData => {
      // console.log("lfmData", lfmData);
      let similarArtists = [];
      for (var i = 0; i < 3; i++) {
        var lfmArtist = lfmData.data.similarartists.artist[i];
          similarArtists.push({
            name: lfmArtist.name,
            lastFmUrl: lfmArtist.url,
        })
      }
    this.setState({
      lastFmResults: similarArtists
    });
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      for (var i = 0; i < this.state.lastFmResults.length; i++) {
        //this.getYouTubeList(this.state.lastFmResults[i].name);
      }
    });
  }

  getFaves() {
    axios.get('/faves')
    .then( faveData => {
      this.setState({
        faves: faveData.data
      });
      console.log("faves", this.state.faves);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      // nothing yet
    });
  }

  deleteFave(_id) {
    axios.delete('/faves/' + _id, {})
    .then( () => {
      console.log('deleted ' + _id);
      this.getFaves();
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      // nothing yet
    });
  }

  addFave({ name, lastFmUrl, thumbnail, youTubeUrl }){
    //console.log(...arguments);
    const ranking = this.state.faves[this.state.faves.length -1].ranking + 'i';
    axios.post('/faves', {
      name, ranking, lastFmUrl, thumbnail, youTubeUrl
    })
    .then( () => {
      this.getFaves();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      // nothing yet
    });
  }

  modFave({ _id, rankNum, note, ranking }){
    console.log(...arguments);
    axios.put('/faves', {
      _id, ranking, note
    })
    .then( () => {
      this.getFaves();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      // nothing yet
    });
  }

  render() {
    return(
      <div>
        <div>
          <Search getLfm={this.getLastFmList} />
          <FmList artists={this.state.lastFmResults} addFave={this.addFave}/>
        </div>
        <div>
          <FaveList faves={this.state.faves} deleteFave={this.deleteFave} />
        </div>
      </div>
    )
  }
}
  export default App;