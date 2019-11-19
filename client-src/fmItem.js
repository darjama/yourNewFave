import React from 'react';

var FmListItem = (props) => {
  const artistObj = {
  name: props.artist.name,
  lastFmUrl: props.artist.lastFmUrl,
  thumbnail: props.artist.thumbnail,
  youTubeUrl: props.artist.youTubeUrl,
  };
  const addtoFaves = function() {
    props.addFave(artistObj);
  };
  return (
    <div className="fmListItem">
        <img className="fmThumbnail" src={props.artist.thumbnail}/>
        <span className="fmName">{props.artist.name}</span><br/>
        <button
    onClick={() => props.addFave(artistObj)} > add to faves</button>
    </div>
  );
};

export default FmListItem;