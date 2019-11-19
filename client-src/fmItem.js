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
      <input
      name={props.artist._id}
      type="checkbox"
      onChange={() => props.addFave(artistObj)} />
      <div className="fmListItem" /*onClick={() => (props.receiveVideo(props.video))}*/>
          <img className="fmThumbnail" src={props.artist.thumbnail}/>
          <div className="fmName">{props.artist.name}</div>
      </div>
    </div>
  );
};

export default FmListItem;