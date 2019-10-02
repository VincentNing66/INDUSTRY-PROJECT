import React, { Component } from 'react';
import "./css/styles.css";

export class LoginForm extends Component {
    static displayName = LoginForm.name;

    render() {
        return (
            <div className="container justify-content-center col-md-12 center">
                <h1>Log Into Dashboard</h1>
                <form action="action_page.php" method="post">
                    <div>
                        <img src={require('./img/willingwebinverse.png')} alt="Willing Web" className='image' />
                    </div>
                    <div class="container justify-content-center">
                        <label for="username"><b>Username</b></label><br></br>
                        <input className="inputbox" type="text" placeholder="Enter Username" name="username" required></input>
                        <br></br>
                        <label for="password"><b>Password</b></label><br></br>
                        <input className="inputbox" type="password" placeholder="Enter Password" name="password" required ></input>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary button" type="button">Login</button>
                        <br></br>
                        <br></br>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="justify-content-center">
                                    <input type="checkbox" checked="checked" name="remember"></input>
                                    <label for="remember" className="padLeft"><b>Remember Me?</b></label><br></br>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label><a href="#"><b>Forgot Password?</b></a></label><br></br>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// LoginForm can be accessed by URL https://localhost:44313/LoginForm
