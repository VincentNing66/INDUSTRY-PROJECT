import React, { Component } from 'react';

var fakeName = 'Bob';
function deleteUser(){
  window.confirm('Are you sure you want to delete '+ xxxx() +' ?')? alert("User deleted") : alert("Request canceled")
}

function xxxx(){

  fakeName = document.getElementById("userSearch").value;

  return fakeName;
}
function searchUser(){
  if (document.getElementById("userSearch").value==fakeName){
    alert('User Not Found!')
  } else if(document.getElementById("userSearch").value=='John'){
    alert('User Not Found!');
  } else{
    alert('User Found')
    fakeName = document.getElementById("userSearch").value;
  }
}
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
                  <input id="userSearch" class="inline m2 form-control col-lg-5" type="text" placeholder="Search" aria-label="Search"></input>
                  <button type="button" class="flowRight m2 inline col-lg-5 btn btn-primary" onClick={searchUser}>Search For User</button>
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
                      <button className="dashButton ol-lg-5 btn btn-primary" onClick={selectUser}>Update User Permission</button>
                      <button className="dashButton ol-lg-5 btn btn-primary" onClick={unlockUser}>Unlock User Account</button>
                      <button className="dashButton ol-lg-5 btn btn-primary" onClick={deleteUser}>Delete User Account</button>
                      <button className="dashButton ol-lg-5 btn btn-primary" onClick={goToCreate}>Create New User Account</button>
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
function goToCreate(){window.location.pathname = "/createUserAccount"}



function selectUser(){alert('User Updated For User '+ xxxx() +'!')}

function unlockUser(){alert('User Unlocke ' + xxxx() +'!')}
