import React from "react";
import axios from "axios";

class UsersListAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loggedInUser: [],
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: `http://localhost:3600/api/users/admin`,
            headers: {
                authorization: localStorage.getItem("token"),
            },
        })
            .then(users => {
                console.log(users);
                this.setState({
                    users: users.data.users,
                    loggedInUser: users.data.token,
                });
            })
            .catch(err => {
                console.log(err);
                alert("Unauthorized");
                window.location.replace("/login");
            });
    }

    render() {
        console.log(this.state.loggedInUser.department);
        return (
            <div>
                <h2>{`"${this.state.loggedInUser.department}"`} access.</h2>
                {this.state.users.map(user => {
                    return (
                        <div key={user.id}>
                            <div>
                                {"\n" +
                                    user.username +
                                    "   --->   " +
                                    user.department +
                                    "\n"}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default UsersListAdmin;
