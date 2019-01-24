import React from 'react';
import axios from 'axios';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:3600/api/users',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(users => {
                console.log(users);
                this.setState({
                    users: users.data.users
                });
            })
            .catch(err => {
                console.log(err);
                alert('Unauthorized')
            });
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => {
                    return (
                        <div key={user.id}>
                            {user.username}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default UsersList;