import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Edit extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      description: "",
      director: "",
      rating: 0,
      movies: [],
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
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

  change(e){
    console.log(e.target.value);
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  submit(e){
    e.preventDefault();
    let editMovie = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating
    }

    axios.put('http://3.120.96.16:3001/movies/' + this.props.id, editMovie)

    this.setState({
      title: "",
      description: "",
      director: "",
      rating: "",})
  }

  render(){
    return(
      <div>
        <form id="addMovie" onSubmit={ this.submit }>
          <label>Title:</label><br />
          <input type="text" name="title" value={ this.state.title } onChange={ this.change }/><br />
          <label>Description:</label><br />
          <textarea rows="4" name="description" value={ this.state.description } onChange={ this.change}></textarea><br />
          <label>Director:</label><br />
          <input type="text" name="director" value={ this.state.director } onChange={ this.change}/><br />
          <label>Rating:</label><br />
          <input type="number" name="rating" value={ this.state.rating } onChange={ this.change}/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Edit;
