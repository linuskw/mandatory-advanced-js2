import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Details extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
      description: "",
      director: "",
      rating: null,
      valid: null,
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
      .catch((error) => {
        this.setState({ valid: error.response.status })
      })
  }

  render(){
    console.log("test");
    return(
      <>
        <Helmet>
          <title>Details: { this.state.title }</title>
        </Helmet>
        <h1>{ this.state.valid === 404 ? "Movie does not exist" : this.state.title }</h1>
        <h2>{ this.state.director }</h2>
        <p>{ this.state.description }</p>
        <h1>{ this.state.rating}</h1>
        <Link to={ '/edit/' + this.props.id }><button id={this.props.id} onClick={ this.editMovie }>Edit</button></Link>
      </>
    )
  }
}

export default Details;
