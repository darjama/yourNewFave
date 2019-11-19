import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class Video extends Component {
  constructor(props) {
    super(props);
    };

  render () {
    return <ReactPlayer url={`https://www.youtube.com/watch?v=${this.props.videoId}-U`} />
  }
}

export default Video;