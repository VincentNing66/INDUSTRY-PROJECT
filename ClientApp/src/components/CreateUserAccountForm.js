import React, { Component } from 'react';
import './css/styles.css';
import { getCookie } from './js/Cookies.js';

export class CreateUserAccountForm extends Component {
    static displayName = CreateUserAccountForm.name;

    constructor(props) {
        super(props);
        this.state = {
            perms: [], loading: true
        };
        //On component load, will get all permissions from the database and populate the drop down list in the form
        fetch('/api/SampleData/getPermissions')
        .then(response => response.json())
        .then(data => this.setState({ perms: data, loading: false }))
        let uId = getCookie('userid');
        this.sendUser = this.sendUser.bind(this);
        this.generateTemporaryPassword = this.generateTemporaryPassword.bind(this);
    }

    generateTemporaryPassword(length) {

        var result = '';
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let rand = Math.random();
        let totalNumbers = numbers.length;
        let randIndex = Math.floor(rand * totalNumbers);
        let randNumber = numbers[randIndex];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < randNumber; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        document.getElementById("password").value = result;
        document.getElementById("confirmPassword").value = result;
    }

    validateDatabaseResponse(data) {
        var warningList = [];
         //Code 200 = Means that username and email doesn't exist. Successful.
        if (data.StatusCode==200) {
            //To display to the user that the account has been created successfully
            alert("User acccount successfully created");
            //To clear out the fields so a user can create another user account
            document.getElementById("username").value = '';
            document.getElementById("firstname").value = '';
            document.getElementById("lastname").value = '';
            document.getElementById("address").value = '';
            document.getElementById("emailAddress").value = '';
            document.getElementById("password").value = '';
            document.getElementById("confirmPassword").value = '';
            document.getElementById("permission").selectedIndex = 0;
            //To change the label colour to green
            document.getElementById("label_username").style.color = "green";
            document.getElementById("label_confirmPassword").style.color = "green";
            document.getElementById("label_password").style.color = "green";
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
    async sendUser() {
        //To get all the values from the input boxes from the form to send to the database through a JSON string
        var uname = document.getElementById("username").value;
        var fname = document.getElementById("firstname").value;
        var lname = document.getElementById("lastname").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("emailAddress").value;
        var pword = document.getElementById("password").value;
        var confirm_pword = document.getElementById("confirmPassword").value;
        var permiss = document.getElementById("permission").value;
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
        if (pword === "" && confirm_pword === "") {
            warningList.push("Please enter a temporary password or click the 'Generate Temporary Password' Button");
        }
        //Validation, will check that that there are no warnings
        if(warningList.length>0)
        {
            //Will display a list of items that are empty
            var warningMessage = "Please enter the following required fields marked in red: \n";
            warningList.forEach(function(item) {
                warningMessage += item + "\n" ;
            });
            alert(warningMessage);
            document.getElementById("label_username").style.color = "red";
            document.getElementById("label_confirmPassword").style.color = "red";
            document.getElementById("label_password").style.color = "red";
            document.getElementById("label_emailAddress").style.color = "red";
            return;
        }
        //Validation - Check that the password and confirm password fields are the same
        if (pword === confirm_pword) {
            var JsonString = `{
              "Username": "`+ uname + `",
              "FirstName": "`+ fname + `",
              "LastName": "`+ lname + `",
              "Address": "`+ address + `",
              "EmailAddress":"` + email + `",
              "Password": "`+ pword + `",
              "PermissionsId": "`+permiss +`"
            }`;
            //All form details have been passed validation. The following post request updates the database 
            //It will try to find if username & email address already exists before inserting into the database
            try {
                fetch('api/SampleData/addUser?userID=' + getCookie('userid'), {
                    method: 'POST',
                    body: JsonString,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then(data => this.validateDatabaseResponse(data));
            }
            catch (Exception) {
                alert("Unable to create this user account. Try again");
            }
        }
        else {
            window.alert("Unable to create new user. The entered password and confirm password does not match. Try again.");
        }
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CreateUserAccountForm.renderForm(this.state.perms);

        return (
            <div className="container col-lg-12 justify-content-center">
                <h1 className="container col-lg-6 justify-content-center">Create User Account</h1>
                <hr></hr>
                <form  className="container col-lg-8">
                    <label id="label_username" htmlFor="username"><b>Username:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                    <br></br>
                    <label id="label_firstname" htmlFor="firstname"><b>First Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" ></input>
                    <br></br>
                    <label id="label_lastname"  htmlFor="lastname" ><b>Last Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" ></input>
                    <br></br>
                    <label id="label_address" htmlFor="address" ><b>Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" ></input>
                    <br></br>
                    <label id="label_emailAddress" htmlFor="emailAddress"><b>Email Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                    <br></br>
                    <label id="label_permission" className="text-primary" htmlFor="permission" ><b>Select Permission:</b></label><br></br>
                    {contents}
                    <hr></hr>
                    <button type="button" name="generatePassword" id="generatePassword" className="btn btn-primary justify-content-center" onClick={this.generateTemporaryPassword.bind(this, 5)}>Generate Temporary Password</button>
                    <br></br><br></br>
                    <label id="label_password" htmlFor="password" ><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Enter Password" name="password" id="password" required ></input>
                    <br></br>
                    <label id="label_confirmPassword" htmlFor="confirmPassword" ><b>Confirm Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                    <br></br>
                    <div className="justify-content-center row">
                        <div className="col-lg-6 col-sm-12 text-center">
                            <button type="button" name="save" onClick={this.sendUser} id="save" className="btn btn-primary">Save</button>
                        </div>
                        <div className="col-lg-6 col-sm-12 text-center">
                            <button type="button" name="cancel" id="cancel" className="btn btn-primary">Cancel</button>
                        </div>
                        <br></br>
                    </div>
                </form>
            </div>);
    }

    //To populate the permission drop down box with a list of permissions from the database
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