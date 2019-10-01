import React, { Component } from 'react';
import './css/styles.css';

export class CreateUserAccountForm extends Component {
    static displayName = CreateUserAccountForm.name;

  render () {
    return (
        <div className="col-lg-8">
            <h1>Create User Account</h1>
            <hr></hr>
            <form action="action_page.php" method="post">
                <label for="username"><b>Username:</b></label>
                <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                <br></br>
                <label for="firstname"><b>First Name:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" required ></input>
                <br></br>
                <label for="lastname"><b>Last Name:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" required ></input>
                <br></br>
                <label for="address"><b>Address:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" required ></input>
                <br></br>
                <label for="emailAddress"><b>Email Address:</b></label><br></br>
                <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                <br></br>
                <label for="permission"><b>Permission</b></label><br></br>
                <input className="form-control" type="text" placeholder="Permission" name="permission" id="permission" required ></input>
                <hr></hr>
                <button type="button" name="generatePassword" id="generatePassword" className="btn btn-primary">Generate Temporary Password</button>
                <br></br><br></br>
                <label for="updatePassword"><b>Password:</b></label><br></br>
                <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
                <br></br>
                <label for="confirmPassword"><b>Confirm Password:</b></label><br></br>
                <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                <br></br>
                <div className="justify-content-center row">
                    <div className="col-lg-6 col-sm-12 text-center">
                        <button type="button" name="save" id="save" className="btn btn-primary">Save</button>
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
