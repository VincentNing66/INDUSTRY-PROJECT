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
        this.updateUser = this.updateUser.bind(this);

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
    validateDatabaseResponse(data) {
        var warningList = [];
        //Code 200 = Means that username and email doesn't exist. Successful.
        if (data.StatusCode == 200) {
            //To display to the user that the account has been created successfully
            alert("User acccount successfully created");
            //To change the label colour to green
            document.getElementById("label_username").style.color = "green";
            document.getElementById("label_confirmPassword").style.color = "green";
            document.getElementById("label_updatePassword").style.color = "green";
            document.getElementById("label_emailAddress").style.color = "green";
            document.getElementById("label_firstname").style.color = "green";
            document.getElementById("label_lastname").style.color = "green";
            document.getElementById("label_address").style.color = "green";
            document.getElementById("label_permission").style.color = "green";
            return;
        }
        //Code 99 = The username exists but the email doesn't exist
        if (data.StatusCode == 99) {
            warningList.push("The username is already associated with another user account.");
        }
        //Code 98 = The username doesn't exists but the email does exist
        if (data.StatusCode == 98) {
            warningList.push("The email address is already associated with another user account");
        }
        //Code 97 = The username exists and the email exists
        if (data.StatusCode == 97) {
            warningList.push("The username is already associated with another user account");
            warningList.push("The email address is already associated with another user account");
        }
        //Code 96 = Unknown
        if (data.StatusCode == 96) {
            warningList.push("Unknown error");
        }
        //Will display a list of items that are empty
        var warningMessage = "Unable to create user account. Please correct the following: \n";
        warningList.forEach(function (item) {
            warningMessage += item + "\n";
        });
        alert(warningMessage);
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
        if (uname === "") {
            warningList.push("Username is empty");
        }
        if (email === "") {
            warningList.push("Email Address is empty");
        }
        //If email is not empty but contains no @ symbol
        else if (email.includes("@")==false) {
            warningList.push("Email Address is not valid");
        }
        if (pword === "") {
            warningList.push("Password is empty");
        }
        if(confirm_pword==="") {
            warningList.push("Confirm password is empty");
        }
        //Validation, will check that that there are no warnings
        if(warningList.length>0)
        {
            //Will display a list of items that are empty
            var warningMessage = "Please enter the following required fields marked in red: \n";
            warningList.forEach(function (item) {
                warningMessage += item + "\n";
            });
            alert(warningMessage);
            document.getElementById("label_username").style.color = "red";
            document.getElementById("label_confirmPassword").style.color = "red";
            document.getElementById("label_updatePassword").style.color = "red";
            document.getElementById("label_emailAddress").style.color = "red";
            return;
        }
        //If the password and confirm password fields are the same
        if (pword === confirm_pword) {
            var JsonString = `{
              "userAccountID": `+getCookie("userid")+`,
              "Username": "`+ uname + `",
              "FirstName": "`+ fname + `",
              "LastName": "`+ lname + `",
              "Address": "`+ address + `",
              "EmailAddress":"` + email + `",
              "Password": "`+ pword + `",
              "PermissionsId": 1
            }`;
            try {
                fetch('api/SampleData/updateUserAccount?', {
                    method: 'POST',
                    body: JsonString,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then(data => this.validateDatabaseResponse(data));
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
                    <div className="justify-content-center row ">
                    <div className="col-lg-6 col-sm-12 text-center">
                        <button type="button" name="save" id="save" onClick={this.updateUser} className="btn btn-primary">Update</button>
                    </div>
                    <div className="col-lg-6 col-sm-12 text-center">
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
                    <label id="label_username" htmlFor="username"><b>Username:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" defaultValue={userDetail.username} required ></input>
                    <br></br>
                    <label id="label_firstname" htmlFor="firstname"><b>First Name:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" defaultValue={userDetail.firstName}></input>
                    <br></br>
                    <label id="label_lastname" htmlFor="lastname"><b>Last Name:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" defaultValue={userDetail.lastName}></input>
                    <br></br>
                    <label id="label_address" htmlFor="address"><b>Address:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" defaultValue={userDetail.address} ></input>
                    <br></br>
                    <label id="label_emailAddress" htmlFor="emailAddress"><b>Email Address:</b></label> <br></br>
                    <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" defaultValue={userDetail.emailAddress} required ></input>
                    <br></br>
                    <label id="label_permission" htmlFor="permission"><b>Current Permission:</b></label>
                    <br></br>
                    <select name="permissions" id="permissions" placeholder="Permission" className="form-control" disabled required>
                        <option>{permName}</option>
                    </select>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <label id="label_updatePassword" htmlFor="updatePassword"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
                    <br></br>
                    <label id="label_confirmPassword" htmlFor="confirmPassword"><b>Confirm Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                    <br></br>
            </div>
    </div>)
  }
}
