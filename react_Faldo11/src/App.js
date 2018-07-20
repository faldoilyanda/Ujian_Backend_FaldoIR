import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import loginadmin from './components/loginadmin';
import adminlist from './components/adminlist';
import tambahuser from './components/tambahuser';
import FormEdit from './components/FormEdit';
import saldo from './components/saldo';
import tambahsaldo from './components/tambahsaldo';
import transfer from './components/transfer';
import customerlist from './components/customerlist';
import show from './components/show';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        
        
        <Route exact path="/" component={loginadmin} />
        <Route path="/adminlist" component={adminlist} />
        <Route path="/tambahuser" component={tambahuser} />
        <Route path="/editdata" component={FormEdit}/>       
        <Route path="/show" component={show}/>       
        <Route path="/customerlist" component={customerlist} />
        <Route path="/saldo" component={saldo} />
        <Route path="/tambahsaldo" component={tambahsaldo} />
        <Route path="/transfer" component={transfer} />
 
      </div>
    );
  }
}

export default App;
