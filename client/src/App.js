import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import SignupForm from "./components/signupForm";
import LoginForm from "./components/loginForm";
import UsersList from "./components/usersList";
import UsersListAdmin from "./components/usersListAdmin";

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
        // console.log(this.state);
    };

    optionPicked(opt) {
        this.setState({
            department: opt,
        });
    }

    loginUser = e => {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            axios({
                method: "post",
                url: "http://localhost:3600/api/login",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
            })
                .then(token => {
                    alert("Login successful!");
                    localStorage.setItem("token", token.data);
                    window.location.replace("/users");
                })
                .catch(err => {
                    alert(err, "Could not login, try again");
                });
        } else {
            alert("Please provide username and password!");
        }
    };

    logoutUser = e => {
        localStorage.removeItem("token");
        window.location.replace("/login");
    };

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
                        <Link to="" onClick={this.logoutUser}>
                            Logout
                        </Link>
                    </div>
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                    <div>
                        <Link to="/users/admin">Admin</Link>
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
                                optionPicked={this.optionPicked}
                            />
                        )}
                    />
                    <Route
                        path="/login"
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
                    <Route
                        exact
                        path="/users"
                        render={props => <UsersList {...props} />}
                    />
                    <Route
                        path="/users/admin"
                        render={props => <UsersListAdmin {...props} />}
                    />
                </div>
            </div>
        );
    }
}

export default App;
