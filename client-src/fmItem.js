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
    <div className="fmListItem" style={{padding:"1pt"}}>
      <table>
        <tbody>
          <tr>
            <td>
            <img className="fmThumbnail" src={props.artist.thumbnail} onClick={() => {props.selectVideo(props.artist.youTubeUrl)}}/>
            </td>
            <td>
            <h6 className="fmName"><a href={props.artist.lastFmUrl} style={{color: "#880000"}} target={"_blank"}>{props.artist.name}</a></h6>
              <button
          onClick={() => props.addFave(artistObj)} > add to faves</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
};

export default FmListItem;