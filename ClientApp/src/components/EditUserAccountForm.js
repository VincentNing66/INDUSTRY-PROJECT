import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './css/style.css';
import { getCookie } from './js/Cookies.js';

export class EditUserAccountForm extends Component {
    static displayName = EditUserAccountForm.name;
    constructor(props) {
        super(props);
        this.state = {
            userDetail: [], permName: "No Permission", loading: true, loading2: true
        };
        this.fetchData();
    }

    async fetchData()
    {
        //To get all the user's details from the database on load of this component
        let uId = getCookie('userid');
        await fetch('/api/SampleData/getUserAccountDetails?userID='+uId)
            .then(response => response.json())
            .then(data => this.setState({ userDetail: data, loading2: false }))
        await fetch('/api/SampleData/GetPermName?permID=' + this.state.userDetail.permissionsID)
            .then(response => response.text())
            .then(data => this.setState({ permName: data, loading: false }))
    }
    //This method is triggered when the "save" button is clicked. It sends data from the form to the database.
    async updateUser() {
        var uname = document.getElementById("username").value;
        var fname = document.getElementById("firstname").value;
        var lname = document.getElementById("lastname").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("emailAddress").value;
        var pword = document.getElementById("updatePassword").value;
        var confirm_pword = document.getElementById("confirmPassword").value;
        //Validation - Check that the required fields are not null and are valid
        var warningList=[];
        if (uname === null || uname === "") {
            warningList.push("Username is empty");
        }
        if (email === null || email === "") {
            warningList.push("Email Address is empty");
        }
        //If email is not empty but contains no @ symbol
        else if (email.includes("@")==false) {
            warningList.push("Email Address is not valid");
        }
        if (pword === null || pword === "") {
            warningList.push("Password is empty");
        }
        if(confirm_pword===null || confirm_pword==="") {
            warningList.push("Confirm password is empty");
        }
        //Validation, will check that that there are no warnings
        if(warningList.count>0)
        {
            //Will display a list of items that are empty
            var warningMessage = "Please enter the following required fields marked in red:";
            var generatedList;
            warningList.forEach(function(item) {
                generatedList += "\n" + item ;
              });
            alert(warningMessage + generatedList);
            return;
        }
        //If the password and confirm password fields are the same
        if (pword === confirm_pword) {
            var JsonString = `{
              "userAccountID": 1,
              "Username": "`+ uname + `",
              "FirstName": "`+ fname + `",
              "LastName": "`+ lname + `",
              "Address": "`+ address + `",
              "EmailAddress":"` + email + `",
              "Password": "`+ pword + `",
              "PermissionsId": 1
            }`;
            try {
                fetch('api/SampleData/updateUserAccount', {
                    method: 'POST',
                    body: JsonString,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert("User account successfully updated");
            }
            catch (Exception) {
                //Something went wrong with the API request
                var random = 0;
            }
        }
        else {
            window.alert("Unable to update user account. The entered password and confirm password does not match. Try again.");
        }
    }
    handleEvent = event => {
        alert("I was clicked");
    };

    reloadPage()
    {
        window.location.reload();
    }

    render() {
        let contents = (this.state.loading && this.state.loading2)
            ? <p><em>Loading...</em></p>
            : EditUserAccountForm.renderForm(this.state.userDetail, this.state.permName);
        return (
            <div>
                <form >
                {contents}
                <div className="justify-content-center row">
                    <div className="col-lg-4 col-sm-12 text-center">
                        <button type="button" name="save" id="save" onClick={this.updateUser} className="btn btn-primary">Update</button>
                        <button type="button" name="cancel" id="cancel" onClick={this.reloadPage} className="btn btn-primary">Cancel</button>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
    static renderForm(userDetail, permName) {
        return (
            <div className="container col-lg-12 justify-content-center">
                <div className="container col-lg-8">
                    <h1 className="center-text">Edit User Account</h1>
                    <hr></hr>
                    <label htmlFor="username"><b>Username:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" defaultValue={userDetail.username} required ></input>
                    <br></br>
                    <label htmlFor="firstname"><b>First Name:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" defaultValue={userDetail.firstName}></input>
                    <br></br>
                    <label htmlFor="lastname"><b>Last Name:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" defaultValue={userDetail.lastName}></input>
                    <br></br>
                    <label htmlFor="address"><b>Address:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" defaultValue={userDetail.address} ></input>
                    <br></br>
                    <label htmlFor="emailAddress"><b>Email Address:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" defaultValue={userDetail.emailAddress} required ></input>
                    <br></br>
                    <label htmlFor="permission"><b>Current Permission:</b></label>
                    <br></br>
                    <select name="permissions" id="permissions" placeholder="Permission" className="form-control" disabled required>
                        <option>{permName}</option>
                    </select>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <label htmlFor="updatePassword"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
                    <br></br>
                    <label htmlFor="confirmPassword"><b>Confirm Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                    <br></br>
            </div>
    </div>)
  }
}
