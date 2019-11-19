import React from 'react';

var FaveItem = (props) => {
  const faveObj = {
  _id: props.fave.name,
  note: props.fave.note,
  ranking: props.fave.ranking
  };
  const addtoFaves = function() {
    props.addFave(artistObj);
  };
  return (
    <div>
      <div className="faveListItem" /*onClick={() => (props.receiveVideo(props.video))}*/>
          <img className="faveThumbnail" src={props.fave.thumbnail}/>
          <div className="faveName">{props.fave.name}</div>
          <button>delete</button><button>move</button><button>save note</button>
      </div>
    </div>
  );
};

export default FaveItem;