import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import RecipeList from "./Container/RecipeList"

class App extends Component {


 
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={RecipeList} />
        </div>
      </Router>
      
    );
  }  
}

export default App;
