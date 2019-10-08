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
            //To check if these details don't already exist in the database
            try {
                fetch('/api/SampleData/CheckUserAccountUsernameDoesNotExist?userName='+uname)
                .then(response => response.json())
                .then(data => this.setState({ usernameExists: data}))
                //If we recieve a response as true, it means that an account with that usernane or email address already exists. 
                //Cannot create the account and must change username or password to something else
                if(this.state.usernameExists==true)
                {
                    alert("This username is associated to another user account.\n Enter a new username");
                    //To reset the state 
                    this.setState({usernameExists:false});
                    return;
                }
            }
            catch (Exception) {
                alert("Unable to check if this user account already exists. Try again");
            }
            try {
                fetch('/api/SampleData/CheckUserAccountEmailDoesNotExist?email='+email)
                .then(response => response.json())
                .then(data => this.setState({ emailExists: data}))
                //If we recieve a response as true, it means that an account with that usernane or email address already exists. 
                //Cannot create the account and must change username or password to something else
                if(this.state.usernameExists==true)
                {
                    alert("This email address is associated to another user account.\n Enter a new email address");
                    //To reset the state 
                    this.setState({emailExists:false});
                    return;
                }
            }
            catch (Exception) {
                alert("Unable to check if this user account already exists. Try again");
            }
            //All form details have been passed validation. The following post request updates the database 
            try {
                if(this.state.emailExists==false && this.state.usernameExists==false)
                {
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
                    document.getElementById("permission").selectedIndex=0;
                }
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
                    <label htmlFor="username"><b>Username:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                    <br></br>
                    <label htmlFor="firstname"><b>First Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" ></input>
                    <br></br>
                    <label htmlFor="lastname"><b>Last Name:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" ></input>
                    <br></br>
                    <label htmlFor="address"><b>Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" ></input>
                    <br></br>
                    <label htmlFor="emailAddress"><b>Email Address:</b></label><br></br>
                    <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                    <br></br>
                    <label htmlFor="permission"><b>Select Permission:</b></label><br></br>
                    {contents}
                    <hr></hr>
                    <button type="button" name="generatePassword" id="generatePassword" className="btn btn-primary justify-content-center">Generate Temporary Password</button>
                    <br></br><br></br>
                    <label htmlFor="updatePassword"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Enter Password" name="permission" id="password" required ></input>
                    <br></br>
                    <label htmlFor="confirmPassword"><b>Confirm Password:</b></label><br></br>
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