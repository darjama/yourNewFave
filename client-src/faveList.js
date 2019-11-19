import React from 'react';
import FaveListItem from './faveItem.js';

var FaveList = (props) => {
  return (
    <div>
      Favorite List:
    <ul className="faveList" style={{listStyleType: 'none'}}>
      {props.faves.map((fave) =>
        <li key={fave._id}>
         <FaveListItem fave={fave} deleteFave={props.deleteFave}
          modFave={props.modFave} rankNum={props.faves.indexOf(fave) + 1}
          selectVideo={props.selectVideo}/>
        </li>
      )}
    </ul>
    </div>
  );

};

export default FaveList;