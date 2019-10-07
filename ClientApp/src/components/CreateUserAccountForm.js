import React, { Component } from 'react';
import './css/styles.css';

export class CreateUserAccountForm extends Component {
    static displayName = CreateUserAccountForm.name;

    sendUser() {
        var JsonString = `{
          "Username": "`+ document.getElementById("username").value + `",
          "FirstName": "`+ document.getElementById("firstname").value + `",
          "LastName": "`+ document.getElementById("lastname").value + `",
          "Address": "`+ document.getElementById("address").value + `",
          "EmailAddress":"` + document.getElementById("emailAddress").value + `",
          "Password": "`+ document.getElementById("updatePassword").value + `",
          "PermissionsId": 1
        }`;
        fetch('api/SampleData/addUser', {
            method: 'POST',
            body: JsonString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

  render () {
    return (
        <div className="col-lg-8">
            <h1>Create User Account</h1>
            <hr></hr>
            <form>
                <label htmlFor="username"><b>Username:</b></label>
                <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                <br></br>
                <label htmlFor="firstname"><b>First Name:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" required ></input>
                <br></br>
                <label htmlFor="lastname"><b>Last Name:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" required ></input>
                <br></br>
                <label htmlFor="address"><b>Address:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" required ></input>
                <br></br>
                <label htmlFor="emailAddress"><b>Email Address:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                <br></br>
                <label htmlFor="permission"><b>Permission</b></label><br></br>
                <input className="form-control" type="text" placeholder="Permission" name="permission" id="permission" required ></input>
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
        </div>
    );
    }
}
