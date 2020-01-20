import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

import Main from './Main.js';
import Add from './Add.js';
import Details from './Details.js';
import Edit from './Edit.js';


class App extends React.Component {
  render(){
    return(
      <Router>
        <Link to="/">Main</Link>
        <Link to="/add">Add</Link>
        <Route exact path="/" component={Main} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" render={ (props) => <Edit id={ props.match.params.id } />} />
        <Route path="/details/:id" render={ (props) => <Details id={ props.match.params.id} />} />
      </Router>
    )
  }
}









export default App;
