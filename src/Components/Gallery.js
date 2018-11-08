import React, { Component } from 'react';
import axios from 'axios';
import './Style/Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount(){
    this.loadImages();
  }

  loadImages = () => {
    return axios.get('http://localhost:3001/api/images')
    .then((res)=>{
      this.setState({images: res.data});
      return this.state;
    });
  }

  render() {
    return (
        <div className="gallery">
          <div className="container">
            <ul className="gallery-images">
              {this.state.images.map(img => {
                return (
                  <div className="image-wrapper">
                    <li key={img._id}>
                      <img src={`./images/${img.name}`}></img>
                      <p>{img.name}</p>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
    );
  }
}

export default Gallery;