import React from 'react';
import './App.css';
import { Link, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';


class Add extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      description: "",
      director: "",
      rating: 0,
      finished: false,
      titleVisibility: "hidden",
      descriptionVisibility: "hidden",
      directorVisibility: "hidden",
      ratingVisibility: "hidden",
      warningColor: "red",
      warningMargin: "5px",
      movies: [],
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);

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
    let newMovie = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating
    }


    axios.post('http://3.120.96.16:3001/movies/', newMovie)
      .then(() => {
        this.setState({
          title: "",
          description: "",
          director: "",
          rating: "",
          finished: true,})
      })
      .catch(() => {
        console.log("false");
        if (newMovie.title.length < 1 || newMovie.description.length > 40) {
          this.setState({ titleVisibility: "visible" })
        } else {
          this.setState({ titleVisibility: "hidden" })
        }
        if (newMovie.description.length < 1 || newMovie.description.length > 300) {
          this.setState({ descriptionVisibility: "visible" })
        } else {
          this.setState({ descriptionVisibility: "hidden" })
        }
        if (newMovie.director.length < 1 || newMovie.director.length > 40) {
          this.setState({ directorVisibility: "visible" })
        } else {
          this.setState({ directorVisibility: "hidden" })
        }
        if (newMovie.rating < 0.0 || newMovie.rating > 5.0) {
          this.setState({ ratingVisibility: "visible" })
        } else {
          this.setState({ ratingVisibility: "hidden" })
        }
      })

  }

  render(){
    if (this.state.finished) {
      return <Redirect to="/" />;
    }
    return(
      <div>
        <form id="addMovie" onSubmit={ this.submit }>
          <label>Title:</label><br />
          <input type="text" name="title" value={ this.state.title } onChange={ this.change }/>
          <label style={{ visibility: this.state.titleVisibility, color: this.state.warningColor, marginLeft: this.state.warningMargin }}>1 - 40 characters</label><br />
          <label>Description:</label><br />
          <textarea rows="4" name="description" value={ this.state.description } onChange={ this.change}></textarea>
          <label style={{ visibility: this.state.descriptionVisibility, color: this.state.warningColor, marginLeft: this.state.warningMargin }}>1 - 300 characters</label><br />
          <label>Director:</label><br />
          <input type="text" name="director" value={ this.state.director } onChange={ this.change}/>
          <label style={{ visibility: this.state.directorVisibility, color: this.state.warningColor,marginLeft: this.state.warningMargin }}>1 - 40 characters</label><br />
          <label>Rating:</label><br />
          <input type="number" name="rating" step="0.1" value={ this.state.rating } onChange={ this.change}/>
          <label style={{ visibility: this.state.ratingVisibility, color: this.state.warningColor, marginLeft: this.state.warningMargin }}>0.0 - 5.0</label><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}



export default Add;
