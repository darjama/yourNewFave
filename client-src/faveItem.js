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
              <input type="text" value={this.state.rankNum} onChange={this.handleRankChange} /><input type="submit" value="update" /><br/>
            </label>
            <label>
              Note:
              <input type="text" value={this.props.fave.note} onChange={this.handleNoteChange} />
            </label>
            <input type="submit" value="save" /><br/>
          </form>

          <button onClick={()=>{this.props.deleteFave(props.fave._id)}}>delete</button>

      </span>
    );
  }

};

export default FaveItem;