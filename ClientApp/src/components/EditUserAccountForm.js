import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './css/style.css';
import { getCookie } from './js/Cookies.js';

export class EditUserAccountForm extends Component {
    static displayName = EditUserAccountForm.name;
    constructor(props) {
        super(props);
        this.btnTapped = this.updateUser.bind(this);
        this.state = {
            userDetail: [], loading: true
        };
        //To get all the user's details from the database on load of this component
        fetch('/api/SampleData/getUserAccountDetails?userID=1')
            .then(response => response.json())
            .then(data => this.setState({ userDetail: data, loading: false }))
    }
    //This method is triggered when the "save" button is clicked. It sends data from the form to the database.
    updateUser() {
        var uname = document.getElementById("username").value;
        var fname = document.getElementById("firstname").value;
        var lname = document.getElementById("lastname").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("emailAddress").value;
        var pword = document.getElementById("updatePassword").value;
        var confirm_pword = document.getElementById("confirmPassword").value;
        //If the following fields are empty, do not update the record
        if (uname == null) {
            alert("Username is empty. Enter a username");
            return;
        }
        else if (email == null) {
            alert("Email is empty. Enter an email address");
            return;
        }
        else if (pword == null) {
            alert("Password is empty. Enter a password");
            return;
        }
        else if(confirm_pword==null) {
            alert("Confirm Password is empty. Enter the password twice");
            return;
        }
        //If the password and confirm password fields are the same
        if (pword === confirm_pword) {
            var JsonString = `{
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
    //To autopopulate the form with current details of the user. 
    populateForm() {
        //document.getElementById("address").value = userDetail.address;
        //Not sure how to populate the response into the user interface not sure how to bind
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : EditUserAccountForm.renderForm(this.state.userDetail);

        return (
            <div>
                {contents}
            </div>
        );
    }
  static renderForm(userDetail) {
    return (
        <div className="container col-lg-12 justify-content-center">
            <div className="container col-lg-8">
                <h1 className="center-text">Edit User Account</h1>
                <hr></hr>
                <form action="action_page.php" method="post">
                    <label htmlFor="username"><b>Username:</b></label>
                        <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                        <br></br>
                        <label htmlFor="firstname"><b>First Name:</b></label> <br></br>
                        <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" >{userDetail.FirstName}</input>
                        <br></br>
                        <label htmlFor="lastname"><b>Last Name:</b></label> <br></br>
                        <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" ></input>
                        <br></br>
                        <label htmlFor="address"><b>Address:</b></label> <br></br>
                        <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" ></input>
                        <br></br>
                        <label htmlFor="emailAddress"><b>Email Address:</b></label> <br></br>
                        <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                        <br></br>
                    <label htmlFor="permission"><b>Current Permission:</b></label> <br></br>
                    <select name="permissions" id="permissions" placeholder="Permission" className="form-control" required option={userDetail.permissionsID} disabled></select>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <label htmlFor="updatePassword"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
                    <br></br>
                    <label htmlFor="confirmPassword"><b>Confirm Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                    <br></br>
                    <div className="justify-content-center row">
                        <div className="col-lg-6 col-sm-12 text-center">
                            <button type="button" name="save" id="save" onClick={this.updateUser} className="btn btn-primary">Update</button>
                        </div>
                        <div className="col-lg-6 col-sm-12 text-center">
                            <button type="button" name="cancel" id="cancel" className="btn btn-primary">Cancel</button>
                        </div>
                    </div>
                    </form>
            </div>
      </div>
    );
  }
}
