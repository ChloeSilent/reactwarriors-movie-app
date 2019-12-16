import React from "react";
import {API_URL, API_KEY_3} from "../../../api/api";

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {
    response;
    sendPromises = () => {
        fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    };




    render() {

        return (
            <div>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={this.sendPromises}
                >
                    Login
                </button>
            </div>
        );
    }
}