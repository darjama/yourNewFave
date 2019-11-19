import FaveListItem from './faveItem.js';

var FaveList = (props) => {
  return (
    <div className="fmList">
      {props.artists.map((artist) =>
        <FaveListItem artist={artist} addFave={props.addFave}/>
      )}
    </div>
  );

};

module.export.fmList = FaveList;