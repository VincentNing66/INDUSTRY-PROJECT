import React, { Component } from 'react';
import "./css/styles.css";

export class LoginForm extends Component {
    static displayName = LoginForm.name;

    render() {
        return (
            <div>
                <h1>Log Into Dashboard</h1>
                <form action="action_page.php" method="post">
                    <div>
                        <img src={require('./img/willingwebicon.png')} alt="Willing Web" className='image' />
                    </div>
                    <div class="container">
                        <label for="username"><b>Username</b></label><br></br>
                        <input className="inputbox" type="text" placeholder="Enter Username" name="username" required></input>
                        <br></br>
                        <label for="password"><b>Password</b></label><br></br>
                        <input className="inputbox" type="password" placeholder="Enter Password" name="password" required ></input>
                        <br></br>
                        <br></br>
                        <button className="button" type="submit">Login</button>
                        <br></br>
                        <label for="remember"><b>Remember Me?</b></label><br></br>
                        <input type="checkbox" checked="checked" name="remember"></input>
                    </div>
                    <div class="container">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <br></br><label><a href="#"><b>Forgot Password?</b></a></label><br></br>
                    </div>
                </form>
            </div>
        );
    }
}
// LoginForm can be accessed by URL https://localhost:44313/LoginForm
