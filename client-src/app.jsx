import React from 'react';
import axios from 'axios';
import keys from  '../keys.js';
import FmList from './fmList.js';
import FaveList from './faveList.js';
import Search from './search.js'
import Video from './video.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faves: [],
      lastFmResults: [],
      currentVideo: 'x6QZn9xiuOE',
      playing: false
    };
    this.getLastFmList = this.getLastFmList.bind(this);
    this.addFave = this.addFave.bind(this);
    this.deleteFave = this.deleteFave.bind(this);
    this.getFaves = this.getFaves.bind(this);
    this.modFave = this.modFave.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.getYouTubeList = this.getYouTubeList.bind(this);
  }

  componentDidMount() {
    this.getLastFmList('BTS');
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
      console.log("lfmData", lfmData);
      if (lfmData.data.similarartists.artist.length === 0 ) {
        alert("Nothing found, sorry! Try again.");
      } else {
      let similarArtists = [];
      for (var i = 0; i < 8; i++) {
        var lfmArtist = lfmData.data.similarartists.artist[i];
          similarArtists.push({
            name: lfmArtist.name,
            lastFmUrl: lfmArtist.url,
        })
      }
    this.setState({
      lastFmResults: similarArtists
    });
  }
  })
    .catch(function (error) {
      // handle error
      console.log(error);
      alert("Nothing found, sorry! Try again.");
    })
    .finally( () => {
      for (var i = 0; i < this.state.lastFmResults.length; i++) {
       // this.getYouTubeList(this.state.lastFmResults[i].name);
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
    const ranking = Number(this.state.faves[this.state.faves.length -1].ranking)*10;
    axios.post('/faves', {
      name, ranking, lastFmUrl, thumbnail, youTubeUrl
    })
    .then( () => {
      this.SetState({
        faves: []
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally( () => {
      this.getFaves();
    });
  }

  modFave({ id, rankNum, note, ranking }){
    // console.log(...arguments);
    // var newRanking;
    // console.log(this.state.faves[rankNum - 1]);
    // if (this.state.faves[rankNum - 1] && this.state.faves[rankNum - 1]._id === id) {
    //   newRanking =  ranking.toString();
    // } else {
    //   var low;
    //   var high;
    //   if (rankNum - 2 < 0) {
    //     low = 0;
    //     high = Number(this.state.faves[0].ranking)
    //   }
    //   if (rankNum >= this.state.faves.length) {
    //     low = Number(this.state.faves[this.state.faves.length - 1].ranking);
    //     high = Number(this.state.faves[this.state.faves.length - 1].ranking) * 10;
    //   }else {
    //     low = Number(this.state.faves[rankNum - 2].ranking);
    //     high = Number(this.state.faves[rankNum - 1].ranking);
    //   }
    //   newRanking = ((low + high)/2).toString();
    // }
    axios.put('/faves', {
      id, note
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

  selectVideo(videoId){
    this.setState({
      currentVideo: videoId,
      playing: true
    })
  }

  render() {
    return(
      <div  style={{width:"100%", alignContent:"center"}}>
      <table>
        <tbody>
          <tr>
            <td style={{verticalAlign:"top"}}>
              <img src="ynfLogo.gif"/>
            </td>
            <td style={{verticalAlign:"text-top"}}>
            <table>
              <tbody>
                <tr>
              <td>
                <Search getLfm={this.getLastFmList} />
                <Video videoId={this.state.currentVideo} playing={this.state.playing}/>
              </td>
              </tr>
              <tr>
              <td>
                <FmList artists={this.state.lastFmResults} addFave={this.addFave} selectVideo={this.selectVideo}/>
              </td>
              </tr>
              </tbody>
              </table>
            </td>
            <td style={{verticalAlign:"top"}}>
              <FaveList faves={this.state.faves} deleteFave={this.deleteFave} selectVideo={this.selectVideo}  modFave={this.modFave}/>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
  export default App;