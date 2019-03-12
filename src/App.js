import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Front from './containers/front/front'
import BlogManager from './containers/blogmanager/blogmanager'

//前端、后端、404
class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route path="/admin" component={BlogManager}/>
          <Route component={Front} />
        </Switch>
      </div>
    );
  }
}

export default App;
