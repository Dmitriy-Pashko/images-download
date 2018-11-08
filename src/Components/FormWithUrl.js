import React, { Component } from 'react';
import axios  from 'axios';
import './Style/Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  handleChange = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
  }

  handleSaveImage = (e) => {
    e.preventDefault();
    return axios.post('http://localhost:3001/api/images', this.state)
      .then(()=>{
        this.setState({url: ''})
        return this.state;
      });
  }

  render() {
    return (
        <div className="App">
          <div className="main-search">
            <p>
              Insert url of image you may want to save 
            </p>
            <form className="search-form" onSubmit={(e) => { this.handleSaveImage(e); }}>
              <input className="input-bold" placeholder="Enter url of the image" name="url" onChange={this.handleChange}></input>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
    );
  }
}

export default Form;
