import React from 'react';

class FaveItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // rankNum: '',
      note: ''
    };
    // this.handleRankChange = this.handleRankChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      rankNum: this.props.rankNum,
      note: this.props.fave.note
    })
  }

  // handleRankChange(e){
  //   this.setState({
  //     rankNum: event.target.value,
  //   })
  // }

  handleNoteChange(e){
    this.setState({
      note: event.target.value,
    })
  }

  handleSubmit(){
    event.preventDefault();
    this.props.modFave({
      id: this.props.fave._id,
      // rankNum: this.state.rankNum,
      // ranking: this.props.fave.ranking,
      note: this.state.note

    });

  }

  render() {
    var note;
    if (this.props.fave.note === null) {
      note = '';
    } else {
      note = this.props.fave.note;
    }
    return (

      <span className="faveListItem" style={{padding:"1pt"}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <img className="faveThumbnail" src={this.props.fave.thumbnail} onClick={() => {this.props.selectVideo(this.props.fave.youTubeUrl)}}/>
                </td>
                <td>
                  <h6 className="faveName"><a href={this.props.fave.lastFmUrl} style={{color: "#880000"}} target={"_blank"}>{this.props.fave.name}</a></h6>
                  <form onSubmit={this.handleSubmit}>
            {/* <label>
              Rank:
              <input type="text" style={{width:"30px"}} value={this.state.rankNum} onChange={this.handleRankChange} />
              <input type="submit" value="update" />
            </label><br/> */}
            <label>
              <textarea style={{height:"40px", width:"190px", wordWrap:"normal", fontSize:"9pt"}}
              value={this.state.note} onChange={this.handleNoteChange} /><br/>
              <input type="submit" value="save note" />
              <button onClick={()=>{this.props.deleteFave(this.props.fave._id)}}>delete fave</button>
            </label>
          </form>

                </td>
              </tr>
            </tbody>
          </table>
      </span>
    );
  }

};

export default FaveItem;