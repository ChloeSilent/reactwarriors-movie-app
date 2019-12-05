import React, {Component} from 'react';

import {API_KEY_3, API_URL} from "../../api/api";

class Year extends Component {


    getYears = () => {

        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.sort_by}page=500&primary_release_year=all`;
        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {
                console.log(data.results)
            });
    };

    render() {

        return (
            <div className="form-group row">
                {this.getYears()}
            </div>
        );
    }
}

export default Year;