import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Form from './FormWithUrl';
import Gallery from './Gallery'
import './Style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="menu">
          <ul className="categories">
            <li>
              <Link to="/">
                Download
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                Gallery
              </Link>
            </li>
          </ul>

          <Route exact path="/" component={Form}/>
          <Route path="/gallery" component={Gallery}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;