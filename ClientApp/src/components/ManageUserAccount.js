import React, { Component } from 'react';

export class ManageUserAccount extends Component {
    static displayName = ManageUserAccount.name;
    constructor(props) {
      super(props);
      this.state = {
          perms: [], loading: true, emailExists:false, usernameExists:false
      };
      //On component load, will get all permissions from the database and populate the drop down list in the form
      fetch('/api/SampleData/getPermissions')
      .then(response => response.json())
      .then(data => this.setState({ perms: data, loading: false }))

  }
  render () {
    let permissionContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ManageUserAccount.renderForm(this.state.perms);
    return (
      <div>
            <div className="container col-lg-10 justify-content-center">
                <h1 className="center-text">Manage User Account</h1>
                <hr></hr>
                <div>
                  <div className="m2">
                    <span className="col-lg-6">Search For User : </span>
                  </div>
                  <input class="inline m2 form-control col-lg-5" type="text" placeholder="Search" aria-label="Search"></input>
                  <button type="button" class="flowRight m2 inline col-lg-5 btn btn-primary">Search For User</button>
                  <hr/>
                  <div>
                    <div className="inline col-lg-6">
                      <h3 className="center-text">Give User Acess To Feature: </h3>
                      <div className="border w100">
                        <div className="m3 center">
                          <input className="m2 inline" type="checkbox"/>
                          <h6 className="inline" >Generate Report</h6>
                        </div>
                        <div className="m3 center">
                          <input className="m2 inline" type="checkbox"/>
                          <h6 className="inline" >Add New Users</h6>
                        </div>
                        <div className="m3 center">
                          <input className="m2 inline" type="checkbox"/>
                          <h6 className="inline" >Delete User Accounts</h6>
                        </div>
                        <div className="m3 center">
                          <input className="m2 inline" type="checkbox"/>
                          <h6 className="inline" >Manage Account Permission</h6>
                        </div>
                      </div> 
                    </div>
                    <div className="inline flowRight col-lg-6">
                      <h3 className="center-text">Select User Permission Level: </h3>
                      <div class="form-group">
                        {permissionContents}
                      </div>
                      <button className="dashButton ol-lg-5 btn btn-primary">Update User Permission</button>
                      <button className="dashButton ol-lg-5 btn btn-primary">Unlock User Account</button>
                      <button className="dashButton ol-lg-5 btn btn-primary">Delete User Account</button>
                      <button className="dashButton ol-lg-5 btn btn-primary">Create New User Account</button>
                    </div>
                  </div>
                </div>
            </div>
      </div>
    );
  }
  static renderForm(perms) 
  {
      return (
          <div className="form-group">
          <select id="permission" name="permission" className="form-control" required>
          {
              perms.map(permission =>
                  <option required value={permission.permissionID}>{permission.permissionName}</option>
              )}
          </select>
          </div>)
      }
}
