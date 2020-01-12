import React from 'react';
import './App.css';
//import Hello from './components/Hello';
import Company from './components/Company';
import Admin from './components/Admin';
import Login from './components/Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Logout from './components/Logout'

function App() {
  return (
    <div className="App">
      
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/company' component={Company} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/logout' component={Logout} />
          </Switch>
        </BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
