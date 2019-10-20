import React, { Component } from 'react';
import "./css/styles.css";
import { setCookie } from './js/Cookies.js';

export class LoginForm extends Component {
    static displayName = LoginForm.name;
    constructor(props) {
        super(props);
        this.state = {
            userDetail: [], loading: true
        };
        //I don't know what this does stackoverflow suggested it
        this.userLogin = this.userLogin.bind(this);
    }

    async userLogin()
    {
        //To get the the username and password on from the user login form
        var user = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        //Validation to check that the username&password are not empty
        var warningList = [];
        if (user === "") {
            warningList.push("No username submitted");
        }
        if (pass === "") {
            warningList.push("No password submitted");
        }
        //Validation, will check that that there are no warnings
        if (warningList.length > 0) {
            //Will display a list of items that are empty
            var warningMessage = "Invalid login attempt. Please re-enter a valid username and password: \n";
            warningList.forEach(function (item) {
                warningMessage += item + "\n";
            });
            alert(warningMessage);
            document.getElementById("label_username").style.color = "red";
            document.getElementById("label_password").style.color = "red";
            return;
        }
        //The request to get the user account where the username and password matches the input
        await fetch('api/SampleData/getUserAccountDetailsForLogin?Username=' + user + '&Password=' + pass)
            .then(response => response.json())
            .then(data => this.setState({ userDetail: data, loading: false }));
        //To check that the response has returned a valid user account detail
        if (this.state.userDetail.username !== "undefined" && this.state.userDetail.userAccountID !== 0) {
            alert("Successful Login. Welcome back " + this.state.userDetail.username);
            this.finishLogin(this.state.userDetail.username, this.state.userDetail.userAccountID);
        }
        else {
            alert("Invalid login attempt. User account does not exist\nPlease re-enter a valid username and password");
            document.getElementById("forgottenPassword").innerText = "Forgot Password? Click here";
        }
    }

    async finishLogin(user, id) {
        var time = document.getElementById("rememberBox").checked ? 10 : 0;

        await setCookie("username", user, time);
        await setCookie("userid", String(id), time);
        window.location.pathname = "/dashboardmain";
    }

    render() {
        return (
            <div className="container justify-content-center col-md-8 center loginform">
                <h1>Log Into Dashboard</h1>
                <form action="action_page.php" method="post">
                    <div>
                        <img src={require('./img/willingwebinverse.png')} alt="Willing Web" className='image' />
                    </div>
                    <div className="container justify-content-center">
                        <label id="label_username" htmlFor="username"><b>Username</b></label><br></br>
                        <input className="form-control text-center" type="text" placeholder="Enter Username" id="username" required></input>
                        <br></br>
                        <label id="label_password" htmlFor="password"><b>Password</b></label><br></br>
                        <input className="form-control text-center" type="password" placeholder="Enter Password" id="password" required ></input>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary button" type="button" name="login" id="login" onClick={this.userLogin}>Login</button>
                        <br></br>
                        <br></br>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="justify-content-center">
                                    <input id="rememberBox" type="checkbox" defaultChecked="checked" name="remember"></input>
                                    <label htmlFor="remember" className="padLeft"><b>Remember Me?</b></label><br></br>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label id="forgottenPassword"><a href="#"><b>Forgot Password?</b></a></label><br></br>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// LoginForm can be accessed by URL https://localhost:44313/LoginForm
