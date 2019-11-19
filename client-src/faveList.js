import React from 'react';
import FaveListItem from './faveItem.js';

var FaveList = (props) => {
  return (
    <div>
      Favorite List:
    <ul className="faveList">
      {props.faves.map((fave) =>
        <li key={fave._id}>
         <FaveListItem fave={fave} deleteFave={props.deleteFave} modFave={props.modFave} rankNum={props.faves.indexOf(fave) + 1}/>
        </li>
      )}
    </ul>
    </div>
  );

};

export default FaveList;