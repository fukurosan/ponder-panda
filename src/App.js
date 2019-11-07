import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Assets/Styles/style.scss'
import { UserContextProvider, UserContext } from './Contexts/UserContext';
import Home from './Components/Pages/Open/Home'
import Express from './Components/Pages/Express/Express'
import Datasets from './Components/Pages/Authenticated/Datasets';
import Predictions from './Components/Pages//Authenticated/Predictions';
import Account from './Components/Pages/Authenticated/Account';
import Login from './Components/Pages/Open/Login';
import Redirect from './Components/Redirect/Redirect'
import NotFound from './Components/Pages/Open/NotFound';

class App extends Component {
  render() {
    return (
      <UserContextProvider>
        <UserContext.Consumer>
          {(UserContext) => (
            <div>
              {UserContext.isLoggedIn ?
                <Router>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/express" component={Express} />
                    <Route path="/datasets" component={Datasets} />
                    <Route path="/predictions" component={Predictions} />
                    <Route path="/account" component={Account} />
                    <Route path="/login" component={Redirect} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </Router>
                :
                <Router>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/express" component={Express} />
                    <Route path="/datasets" component={Redirect} />
                    <Route path="/predictions" component={Redirect} />
                    <Route path="/account" component={Redirect} />
                    <Route path="/login" component={Login} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </Router>}
            </div>
          )}
        </UserContext.Consumer>
      </UserContextProvider>
    );
  }
}

export default App;
