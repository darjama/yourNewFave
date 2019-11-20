import React from 'react';
import FmListItem from './fmItem.js';

var FmList = (props) => {
  return (
    <div>
      <h5 style={{width:"650px"}}>Click on pictures to play videos, on artist name to open window with artist details, on the button to add to your favorite list.
      </h5>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width:"650px", height: "360px", overflow: "auto"}}>


      <ul className="fmList" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", listStyleType: 'none'}}>
        {props.artists.map((artist) =>
          <li key={artist.lastFmUrl}>
            <FmListItem artist={artist}  addFave={props.addFave} selectVideo={props.selectVideo}/>
          </li>
        )}
      </ul>
      </div>
    </div>
  );

};

export default FmList;