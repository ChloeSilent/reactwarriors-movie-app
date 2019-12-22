import React, {Component} from 'react';

class User extends Component {


    render() {
        const {user} = this.props;
        return (
            <div>
                <img
                    width="40"
                    className="rounded-circle"
                    src={`https://secure.gravatar.com/avatar/${
                        user.avatar.gravatar.hash
                        }.jpg?s=64"`}
                    alt=""
                />
            </div>
        );
    }
}

export default User;
