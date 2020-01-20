import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      movies: [],
      title: "",
      director: "",
  }

  this.deleteMovie = this.deleteMovie.bind(this);
}

  componentDidMount(){
    axios.get('http://3.120.96.16:3001/movies')
      .then((response) => {
        this.setState({ movies: response.data})
      });
  }

  renderTableData() {

    return this.state.movies.filter(movies => {
      let filteredTitles = movies.title.toUpperCase().includes(this.state.title.toUpperCase());
      let filteredDirectors = movies.director.toUpperCase().includes(this.state.director.toUpperCase());

      if (filteredTitles && filteredDirectors){
        return true
      }
    }).map((movie, index) => {
        const { id, title, director, rating } = movie;
        return(
          <tr key={id}>
            <td>{title}</td>
            <td>{director}</td>
            <td>{rating}</td>
            <td>
              <Link to={ '/edit/' + id }><button id={id} onClick={ this.editMovie }>Edit</button></Link>
            </td>
            <td>
              <Link to={ '/details/' + id }><button id={id} onClick={ this.detailsMovie }>Details</button></Link>
            </td>
            <td>
              <button id={id} onClick={ this.deleteMovie }>Delete</button>
            </td>
          </tr>
        )
      })
    }

  deleteMovie(e){
    axios.delete('http://3.120.96.16:3001/movies/' + e.target.id)
      .then((response) => {
        axios.get('http://3.120.96.16:3001/movies')
          .then((response) => {
            this.setState({ movies: response.data})
          });
      })
      .catch((error) => {
        axios.get('http://3.120.96.16:3001/movies')
          .then((response) => {
            this.setState({ movies: response.data})
          });
      })
  }


  render(){
    console.log(this.state.title);
    return(
      <>
        <Helmet>
          <title>Movies</title>
        </Helmet>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
          <tr>
            <td><input type="text" value={ this.state.title } onChange={ e => this.setState({ title: e.target.value}) }/></td>
            <td><input type="text" value={ this.state.director } onChange={ e => this.setState({ director: e.target.value}) }/></td>
          </tr>
          </table>
      </>
    )
  }
}

export default Main;
