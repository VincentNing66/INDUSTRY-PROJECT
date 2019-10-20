import React, { Component } from 'react';

function deleteUser(){
    alert("Sorry, this feature has not been implemented yet")
}

export class ManageUserAccount extends Component {
    static displayName = ManageUserAccount.name;
    constructor(props) {
      super(props);
      this.state = {
          perms: [], loading: true, showUserContainer:false, showManageContainer:false
      };
      //On component load, will get all permissions from the database and populate the drop down list in the form
      fetch('/api/SampleData/getPermissions')
      .then(response => response.json())
            .then(data => this.setState({ perms: data, loading: false }))
        this.searchUser = this.searchUser.bind(this);

    }
    validateDatabaseResponse(data) {

        this.setState({ showUserContainer: true, showManageContainer: true })
        //document.getElementById("searchResult").value = data.Username;
        //document.getElementById("currentPermission").value = data.PermissionsID;
    }
    async searchUser() {
        var random = 0;
        var feild = document.getElementById("userSearch").value;
        //Validation - Check that the required fields are not null and are valid
        var warningList = [];
        if (feild === "") {
            warningList.push("The search field is empty");
        }
        //Validation, will check that that there are no warnings
        if (warningList.length > 0) {
            //Will display a list of items that are empty
            var warningMessage = "Please enter the following required fields marked in red: \n";
            warningList.forEach(function (item) {
                warningMessage += item + "\n";
            });
            alert(warningMessage);
            document.getElementById("label_userSearch").style.color = "red";
        }
        try {
            //fetch('api/SampleData/SearchForUserAccount?feild=' + feild)
            //    .then(response => response.json()).then(data => this.validateDatabaseResponse(data));
            this.setState({ showUserContainer: true, showManageContainer: true })
        }
        catch (Exception) {
            //Something went wrong with the API request
            var random = 0;
        }
    }
      render () {
        let permissionContents = this.state.loading
                ? <p><em>Loading...</em></p>
                : ManageUserAccount.renderForm(this.state.perms);
        return (
          <div>
                <div className="container col-lg-10 justify-content-center">
                    <h1 className="center-text">Manage User Accounts</h1>
                    <hr></hr>
                    <div>
                        <div id="SearchForUserContainer">
                            <label id="label_userSearch" htmlFor="userSearch"><b>Search for a user (using a username or email address):</b></label> <br></br>
                      <input id="userSearch" class="inline m2 form-control col-lg-5" type="text" placeholder="Search" aria-label="Search"></input>
                      <button type="button" class="flowRight m2 inline col-lg-5 btn btn-primary" onClick={this.searchUser}>Search For User</button>
                        <hr />
                        </div>
                        <div id="CurrentUserContainer" style={{ display: this.state.showUserContainer ? 'block' : 'none' }}>
                            <label id="label_userResult" htmlFor="searchResult"><b>Selected User:</b></label> <br></br>
                            <input id="searchResult" class="inline m2 form-control col-lg-5" type="text" placeholder="Selected User" ></input>
                            <input id="currentPermission" class="flowRight m2 inline col-lg-5" type="text" placeholder="User's Current Permission"></input>
                            <hr />
                        </div>
                        <div id="ManageUserContainer" style={{ display: this.state.showManageContainer ? 'block' : 'none' }}>
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



function selectUser() { alert("Sorry, this feature has not been implemented yet")}

function unlockUser(){alert("Sorry, this feature has not been implemented yet")}
