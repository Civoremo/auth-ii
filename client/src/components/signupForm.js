import React from "react";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.register}>
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
                        type="text"
                        onChange={this.props.handleChange}
                        placeholder="password (min 6 chars)"
                        name="password"
                        value={this.props.password}
                        required={true}
                        autoComplete="false"
                    />
                    <input
                        type="text"
                        onChange={this.props.handleChange}
                        placeholder="department"
                        name="department"
                        value={this.props.department}
                        required={true}
                        autoComplete="false"
                    />
                </form>
                <button onClick={this.props.register}>Register</button>
            </div>
        );
    }
}

export default SignupForm;
