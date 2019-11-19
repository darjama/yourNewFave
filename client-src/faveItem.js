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

      <span className="faveListItem" /*onClick={() => (props.receiveVideo(props.video))}*/>
          <img className="faveThumbnail" src={this.props.fave.thumbnail}/>
          <div className="faveName">{this.props.fave.name}</div>
          <form onSubmit={this.handleSubmit}>
            {/* <label>
              Rank:
              <input type="text" style={{width:"30px"}} value={this.state.rankNum} onChange={this.handleRankChange} />
              <input type="submit" value="update" />
            </label><br/> */}
            <label>
              Note:
              <textarea style={{height:"60px", wordWrap:"normal"}}
              value={this.state.note} onChange={this.handleNoteChange} />
              <input type="submit" value="save note" />
            </label><br/>
          </form>

          <button onClick={()=>{this.props.deleteFave(this.props.fave._id)}}>delete fave</button>

      </span>
    );
  }

};

export default FaveItem;