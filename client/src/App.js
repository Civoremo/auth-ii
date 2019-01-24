import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import SignupForm from "./components/signupForm";
import LoginForm from './components/loginForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            department: "",
        };
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
    };

    registerUser = e => {
        e.preventDefault();
        if (
            this.state.username &&
            this.state.password.length >= 4 &&
            this.state.department
        ) {
            axios({
                method: 'post',
                url: 'http://localhost:3600/api/register',
                data: {
                    "username": this.state.username,
                    "password": this.state.password,
                    "department": this.state.department,
                }
            })
                .then(id => {
                    axios({
                        method: "post",
                        url: "http://localhost:3600/api/login",
                        data: {
                            "username": this.state.username,
                            "password": this.state.password,
                        },
                    })
                        .then(token => {
                            alert('registered and logged in');
                            localStorage.setItem("token", token.data);
                            window.location.replace('/users');
                        })
                        .catch(err => {
                            alert(err, "Could not login");
                        });
                })
                .catch(err => {
                    alert(err, "could not register");
                });
        } else {
            alert(
                "Provide username, password with at least 6 characters and the department!"
            );
        }
    };

    loginUser = e => {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            axios({
                method: 'post',
                url: 'http://localhost:3600/api/login',
                data: {
                    "username": this.state.username,
                    "password": this.state.password
                }
            })
                .then(token => {
                    alert('Login successful!');
                    localStorage.setItem('token', token.data);
                    window.location.replace('/users');
                })
                .catch(err => {
                    alert(err, 'Could not login, try again');
                });
        } else {
            alert('Please provide username and password!');
        }
    }

    render() {
        return (
            <div className="App">
                <nav>
                    <div>
                        <Link to="/users">User List</Link>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                    <div>
                        <Link to="/">Logout</Link>
                    </div>
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>

                <div>
                    <Route
                        path="/register"
                        render={props => (
                            <SignupForm
                                {...props}
                                username={this.state.username}
                                password={this.state.password}
                                department={this.state.department}
                                handleChange={this.handleChange}
                                register={this.registerUser}
                            />
                        )}
                    />
                    <Route
                        path='/login'
                        render={props => (
                            <LoginForm
                                {...props}
                                username={this.state.username}
                                password={this.state.password}
                                handleChange={this.handleChange}
                                login={this.loginUser}
                            />
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default App;
