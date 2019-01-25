import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.login}>
                    <div>Login Form</div>
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
                        placeholder="password"
                        name="password"
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                </form>
                <button onClick={this.props.login}>Login</button>
            </div>
        );
    }
}

export default LoginForm;
