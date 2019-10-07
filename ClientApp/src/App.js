import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Counter } from './components/Counter';
import { LoginForm } from './components/LoginForm';
import { EditUserAccountForm } from './components/EditUserAccountForm';
import { ManageUserAccount } from './components/ManageUserAccount';
import { CreateUserAccountForm } from './components/CreateUserAccountForm';
import { DashboardMain } from './components/DashboardMain';

const DefaultContainer = () => (
  <div>
  <div className="container">
    <Layout>
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/CreateUserAccount' component={CreateUserAccountForm}/>
        <Route path='/EditUserAccount' component={EditUserAccountForm} />
        <Route path='/ManageUserAccount' component={ManageUserAccount} />
        <Route path='/DashboardMain' component={DashboardMain} />
    </Layout>
  </div>
  </div>
)

const LoginContainer = () => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/Loginorm" />} />
    <Route path="/LoginForm" component={LoginForm} />
  </div>
)
export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
        <Switch>
          <Route exact path="/(loginform)" component={LoginContainer}/>
          <Route component={DefaultContainer}/>
        </Switch>
    );
  }
}
