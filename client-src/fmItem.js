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
    <div>
      <button
      onClick={() => props.addFave(artistObj)} > add to faves</button>
      <div className="fmListItem" /*onClick={() => (props.receiveVideo(props.video))}*/>
          <img className="fmThumbnail" src={props.artist.thumbnail}/>
          <span className="fmName">{props.artist.name}</span>
      </div>
    </div>
  );
};

export default FmListItem;