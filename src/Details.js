import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Details extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
      description: "",
      director: "",
      rating: 0,
    }
  }

  componentDidMount(){
    axios.get('http://3.120.96.16:3001/movies/' + this.props.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          director: response.data.director,
          rating: response.data.rating,
        })
      })
  }

  render(){
    console.log("test");
    return(
      <>
        <h1>{ this.state.title }</h1>
        <h2>{ this.state.director }</h2>
        <p>{ this.state.description }</p>
        <h1>{ this.state.rating}</h1>
        <Link to={ '/edit/' + this.props.id }><button id={this.props.id} onClick={ this.editMovie }>Edit</button></Link>
      </>
    )
  }
}

export default Details;
