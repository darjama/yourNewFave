import React from 'react';
import FmListItem from './fmItem.js';

var FmList = (props) => {
  return (
    <form>
      <label>
      Select an artist below to add them to your favorite list

    <ul className="fmList">
      {props.artists.map((artist) =>
        <li key={artist.lastFmUrl}>
          <FmListItem artist={artist}  addFave={props.addFave}/>
        </li>
      )}
    </ul>
    </label>
    </form>
  );

};

export default FmList;