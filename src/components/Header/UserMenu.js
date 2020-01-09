import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"

class UserMenu extends Component {
    state = {
        dropdownOpen: false
    };

    toggleDropDown = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    };

    render() {
        const {user} = this.props;
        return (
            <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropDown}>
                <DropdownToggle tag="img"
                                width="40"
                                className="rounded-circle">
                    src={`https://secure.gravatar.com/avatar/${
                    user.avatar.gravatar.hash
                }.jpg?s=64"`}
                    alt=""
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Выйти</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default UserMenu;