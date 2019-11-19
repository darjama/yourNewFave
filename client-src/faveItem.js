import React from 'react';

class FaveItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankNum: ''
    };
    this.handleRankChange = this.handleRankChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      rankNum: this.props.rankNum
    })
  }

  handleRankChange(e){
    this.setState({
      rankNum: event.target.value,
    })
  }

  handleNoteChange(e){
    this.setState({
      note: event.target.value,
    })
  }

  handleSubmit(){
    this.props.modFave({
      id: this.props.fave._id,
      rankNum: this.state.rankNum,
      note: this.state.note,
      ranking: this.props.ranking
    });
    event.preventDefault();
  }

  render() {
    return (

      <span className="faveListItem" /*onClick={() => (props.receiveVideo(props.video))}*/>
          <img className="faveThumbnail" src={this.props.fave.thumbnail}/>
          <div className="faveName">{this.props.fave.name}</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Rank:
              <input type="text" style={{width:"30px"}} value={this.state.rankNum} onChange={this.handleRankChange} />
              <input type="submit" value="update" />
            </label><br/>
            <label>
              Note:
              <textarea style={{height:"60px", wordWrap:"normal"}} value={this.props.fave.note} onChange={this.handleNoteChange} />
              <input type="submit" value="save" />
            </label><br/>
          </form>

          <button onClick={()=>{this.props.deleteFave(this.props.fave._id)}}>delete</button>

      </span>
    );
  }

};

export default FaveItem;