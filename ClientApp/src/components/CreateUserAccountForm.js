import React, { Component } from 'react';
import './css/styles.css';

export class CreateUserAccountForm extends Component {
    static displayName = CreateUserAccountForm.name;

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

    sendUser() {
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
        if (uname === null || uname === "") {
            warningList.push("Username is empty");
            document.getElementById("username").style.backgroundColor = "#c9c5c8";
        }
        if (email === null || email === "") {
            warningList.push("Email Address is empty");
            document.getElementById("emailAddress").style.backgroundColor = "#c9c5c8";
        }
        //If email is not empty but contains no @ symbol
        else if (email.includes("@")==false) {
            warningList.push("Email Address is not valid");
            document.getElementById("emailAddress").style.backgroundColor = "#c9c5c8";
        }
        if (pword === null || pword === "") {
            warningList.push("Password is empty");
            document.getElementById("password").style.backgroundColor = "#c9c5c8";
        }
        if(confirm_pword===null || confirm_pword==="") {
            warningList.push("Confirm password is empty");
            document.getElementById("confirmPassword").style.backgroundColor = "#c9c5c8";
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
            return;
        }
        //Validation - Check that the password and confirm password fields are the same
        if (pword === confirm_pword) {
            document.getElementById("username_label").style.className ="text-success";
            document.getElementById("firstname").style.className = "text-success";
            document.getElementById("lastname").style.className = "text-success";
            document.getElementById("address").style.className = "text-success";
            document.getElementById("emailAddress").style.className = "text-success";
            document.getElementById("password").style.className = "text-success";
            document.getElementById("confirmPassword").style.className = "text-success";
            document.getElementById("permission").style.className = "text-success";
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
            try {
                fetch('api/SampleData/addUser', {
                    method: 'POST',
                    body: JsonString,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //To display to the user that the account has been created successfully
                alert("User acccount successfully created");
                //To clear out the fields so a user can create another user account
                document.getElementById("username").value = '';
                document.getElementById("firstname").value='';
                document.getElementById("lastname").value='';
                document.getElementById("address").value='';
                document.getElementById("emailAddress").value='';
                document.getElementById("password").value='';
                document.getElementById("confirmPassword").value='';
                document.getElementById("permission").selectedIndex = 0;
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
                    <label className="text-primary" htmlFor="username" id="username_label"><b>Username:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="firstname" id="firstname_label"><b>First Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="lastname" id="lastname_label"><b>Last Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="address" id="address_label"><b>Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="emailAddress" id="emailAddress_label"><b>Email Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="permission" id="permission_label"><b>Select Permission:</b></label><br></br>
                    {contents}
                    <hr></hr>
                    <button type="button" name="generatePassword" id="generatePassword" className="btn btn-primary justify-content-center">Generate Temporary Password</button>
                    <br></br><br></br>
                    <label className="text-primary" htmlFor="password" id="password_label"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Enter Password" name="password" id="password" required ></input>
                    <br></br>
                    <label className="text-primary" htmlFor="confirmPassword" id="confirmPassword_label"><b>Confirm Password:</b></label><br></br>
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