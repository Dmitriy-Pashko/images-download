import React, { Component } from 'react';
import axios  from 'axios';
import './Style/Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      msg:'',
    };
  }

  handleChange = (e) => {
    this.setState({ 
      url: e.target.value,
      msg: ''
    })
  }

  handleSaveImage = (e) => {
    e.preventDefault();
    return axios.post('http://localhost:3001/api/images', this.state)
      .then((res)=>{
        this.setState({
          url: '',
          msg: res.data,
        })
        return this.state;
      });

  }

  render() {
    let classShow = this.state.msg === '' ? 'hide-msg' : 'popup';

    return (
        <div className="App">
          <div className="main-search">
            <p>
              Insert url of image you may want to save(jpg, jpeg or png)
            </p>
            <form className="search-form" onSubmit={(e) => { this.handleSaveImage(e); }}>
              <input className="input-bold" placeholder="Enter url of the image" name="url" required onChange={this.handleChange} value={this.state.url}></input>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
            <p className={classShow}>{this.state.msg}</p>
          </div>
        </div>
    );
  }
}

export default Form;
