import React, {Component} from 'react';
import {AppContext} from "../App";
import UserMenu from "./UserMenu";
class User extends Component {


    render() {
        const {user} = this.props;
        return (
                <UserMenu user={user}/>
        );
    }
}

const UserContainer =  props=>{
    return <AppContext.Consumer>
        {(context)=>{
            return <User user={context.user} {...props} />
        }}
    </AppContext.Consumer>
};

UserContainer.displayName = "UserContainer";
export default UserContainer;