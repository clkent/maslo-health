import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import Patient from './Patient';
import Doctor from './Doctor';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/patient" component={Patient} />
          <Route exact path="/doctor" component={Doctor} />
          <Redirect to="/patient" />
        </Switch>
      </Router>
    );
  }
}

export default App;
