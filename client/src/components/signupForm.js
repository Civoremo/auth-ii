import React from "react";
import axios from "axios";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selOp: 0,
        };
    }

    optionPicked = e => {
        let x = document.getElementById("depSelect").value;
        this.setState({
            selOp: x,
        });
    };

    registerUser = e => {
        e.preventDefault();
        console.log(this.state.selOp);
        console.log(this.props.username);
        console.log(this.props.password);
        if (
            this.props.username &&
            this.props.password.length >= 6 &&
            this.state.selOp !== 0
        ) {
            axios({
                method: "post",
                url: `http://localhost:3600/api/register`,
                data: {
                    username: this.props.username,
                    password: this.props.password,
                    department: this.state.selOp,
                },
            })
                .then(id => {
                    axios({
                        method: "post",
                        url: `http://localhost:3600/api/login`,
                        data: {
                            username: this.props.username,
                            password: this.props.password,
                        },
                    })
                        .then(token => {
                            alert("registered and logged in");
                            localStorage.setItem("token", token.data);
                            window.location.replace("/users");
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

    render() {
        return (
            <div>
                <form onSubmit={this.registerUser}>
                    <div>SignUp Form</div>
                    <input
                        type="text"
                        onChange={this.props.handleChange}
                        placeholder="username"
                        name="username"
                        value={this.props.username}
                        required={true}
                        autoComplete="false"
                    />
                    <input
                        type="password"
                        onChange={this.props.handleChange}
                        placeholder="password (min 6 chars)"
                        name="password"
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                    <select required id="depSelect" onClick={this.optionPicked}>
                        <option value="select">Select</option>
                        <option value="sales">sales</option>
                        <option value="marketing">marketing</option>
                        <option value="hr">hr</option>
                        <option value="s&r">s&r</option>
                        <option value="admin">admin</option>
                    </select>
                </form>
                <button onClick={this.registerUser}>Register</button>
            </div>
        );
    }
}

export default SignupForm;
