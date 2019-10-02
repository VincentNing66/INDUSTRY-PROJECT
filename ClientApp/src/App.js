import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { LoginForm } from './components/LoginForm';
import { EditUserAccountForm } from './components/EditUserAccountForm';
import { ManageUserAccount } from './components/ManageUserAccount';
import { CreateUserAccountForm } from './components/CreateUserAccountForm';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/LoginForm' component={LoginForm} />
        <Route path='/EditUserAccount' component={EditUserAccountForm} />
        <Route path='/ManageUserAccount' component={ManageUserAccount} />
        <Route path='/CreateUserAccount' component={CreateUserAccountForm} />
      </Layout>
    );
  }
}
