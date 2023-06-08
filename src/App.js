import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize=6;
  apikey = process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {    
    return (

      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        height={8}
        progress={this.state.progress}       
      />
          <Routes>
            <Route path="/"              element={<News apikey={this.apikey} setProgree={this.setProgress}  key ="general" country="in" pageSize={this.pagesize} category="general" />} />
            <Route path="/Entertainment"  element={<News apikey={this.apikey} setProgree={this.setProgress} key ="entertainment" country="in" pageSize={this.pagesize} category="entertainment" />} />
            <Route path="/Health"         element={<News apikey={this.apikey} setProgree={this.setProgress} key ="health" country="in" pageSize={this.pagesize} category="health" />} />
            <Route path="/Science"        element={<News apikey={this.apikey} setProgree={this.setProgress} key ="Science" country="in" pageSize={this.pagesize} category="Science" />} />
            <Route path="/Business"       element={<News apikey={this.apikey} setProgree={this.setProgress} key ="business" country="in" pageSize={this.pagesize} category="business" />} />
            <Route path="/Sports"         element={<News apikey={this.apikey} setProgree={this.setProgress} key ="sports" country="in" pageSize={this.pagesize} category="sports" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
