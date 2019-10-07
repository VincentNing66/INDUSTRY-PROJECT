import React, { Component } from 'react';
import './css/styles.css';

export class CreateUserAccountForm extends Component {
    static displayName = CreateUserAccountForm.name;

    constructor(props) {
        super(props);
        this.state = {
            perms: [], loading: true
        };
        fetch('/api/SampleData/getPermissions')
        .then(response => response.json())
            .then(data => this.setState({ perms: data, loading: false }))

    }
    //This method is triggered on page load to get all permissions from the database and populate a dropdownbox for the user to select permission.
    //componentDidMount() {
        
    //}

    sendUser() {
        var uname = document.getElementById("username").value;
        var fname = document.getElementById("firstname").value;
        var lname = document.getElementById("lastname").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("emailAddress").value;
        var pword = document.getElementById("updatePassword").value;
        var confirm_pword = document.getElementById("confirmPassword").value;
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
                fetch('api/SampleData/addUser', {
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
            window.alert("Unable to create new user. The entered password and confirm password does not match. Try again.");
        }
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CreateUserAccountForm.renderForm(this.state.perms);

        return (
            <div className="col-lg-8">
                <h1>Create User Account</h1>
                <hr></hr>
                <form action="action_page.php" method="post">
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
                    <button type="button" name="generatePassword" id="generatePassword" className="btn btn-primary">Generate Temporary Password</button>
                    <br></br><br></br>
                    <label htmlFor="updatePassword"><b>Password:</b></label><br></br>
                    <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
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
}