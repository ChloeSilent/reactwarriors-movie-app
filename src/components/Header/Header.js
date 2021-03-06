import React from "react";
import Login from "./Login/Login";
import User from "./User";

class Header extends React.Component {
    render() {
        const {user, updateSessionId} = this.props;

        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                    </ul>
                    {user ?<User/> :<Login updateSessionId={updateSessionId}/>}
                </div>
            </nav>
        );
    }
}

export default Header;

