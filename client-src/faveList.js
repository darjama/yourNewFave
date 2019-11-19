import React from 'react';
import FaveListItem from './faveItem.js';

var FaveList = (props) => {
  return (
    <div>
      Favorite List:
    <ol className="faveList">
      {props.faves.map((fave) =>
        <li key={fave._id}>
         <FaveListItem fave={fave} />
        </li>
      )}
    </ol>
    </div>
  );

};

export default FaveList;