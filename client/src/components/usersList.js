import React from "react";
import axios from "axios";

class UsersList extends React.Component {
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
            url: `http://localhost:3600/api/users`,
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
        if (this.state.loggedInUser.department === undefined) {
            return <></>;
        }
        console.log(this.state.loggedInUser.department);
        return (
            <div>
                <h2>
                    List of users in the{" "}
                    {`"${this.state.loggedInUser.department}"`} department.
                </h2>
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

export default UsersList;
