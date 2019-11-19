import React from 'react';
import FmListItem from './fmItem.js';

var FmList = (props) => {
  return (
    <div>
      Select an artist below to add them to your favorite list

    <ul className="fmList" style={{listStyleType: 'none'}}>
      {props.artists.map((artist) =>
        <li key={artist.lastFmUrl}>
          <FmListItem artist={artist}  addFave={props.addFave} selectVideo={props.selectVideo}/>
        </li>
      )}
    </ul>
    </div>
  );

};

export default FmList;