import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'BTS'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit(){
    this.props.getLfm(this.state.value);
    event.preventDefault();
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter the name of an artist you like
          <input type="text" value={this.state.value} style={{margin: '5px'}} onChange={this.handleChange} />
            <input type="submit" value="let's find some music" /><br/>
        </label>

      </form>
    )
  }

}

export default Search;