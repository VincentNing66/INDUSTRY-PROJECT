import React, { Component } from 'react';
import './css/style.css';

export class EditUserAccountForm extends Component {
    static displayName = EditUserAccountForm.name;

  render () {
    return (
        <div className="col-lg-8">
            <h1>Edit User Account</h1>
            <hr></hr>
            <form action="action_page.php" method="post">
                <input className="form-control" type="text" placeholder="Enter Username" name="username" id="username" required ></input>
                <br></br>
                <input className="form-control" type="text" placeholder="Enter First Name" name="firstname" id="firstname" required ></input>
                <br></br>
                <input className="form-control" type="text" placeholder="Enter Last Name" name="lastname" id="lastname" required ></input>
                <br></br>
                <input className="form-control" type="text" placeholder="Enter Address" name="address" id="address" required ></input>
                <br></br>
                <input className="form-control" type="text" placeholder="Enter Email Address" name="emailAddress" id="emailAddress" required ></input>
                <br></br>
                <input className="form-control" type="text" placeholder="Permission" name="permission" id="permission" required ></input>
                <br></br>
                <hr></hr>
                <br></br>
                <input className="form-control" type="password" placeholder="Update Password" name="permission" id="updatePassword" required ></input>
                <br></br>
                <input className="form-control" type="password" placeholder="Confirm New Password" name="confirmPassword" id="confirmPassword" required ></input>
                <br></br>
                <button type="button" name="save" id="save" className="btn btn-primary">Update</button>
                <br></br>
                <button type="button" name="cancel" id="cancel" className="btn btn-primary">Cancel</button>
                <br></br>
            </form>
      </div>
    );
  }
}
