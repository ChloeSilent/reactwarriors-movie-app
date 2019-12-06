import React, {Component} from 'react';

import {API_KEY_3, API_URL} from "../../api/api";

class Year extends Component {


    static defaultProps = {
        releaseYears: {
            from: 1900,
            to: new Date().getFullYear()
        },
        options: []
    };

    getOptions = () => {
        let opt = [];
        for (let i = this.props.releaseYears.from; i <= this.props.releaseYears.to; i++) {
            opt.push(i);
        }
        return opt;
    };


    render() {
        const options = this.getOptions();

        return (
            <div className="form-group row">
                <label htmlFor="sort_by">Сортировать по:</label>
                <select className="form-control"
                        value={this.props.primary_release_year}
                        onChange={this.props.onChangePrimaryReleaseYears}
                        name="primary_release_year"
                >
                    {options.map((option) => {
                        return <option key={option}
                                       value={option}>{option}</option>
                    })}
                </select>
            </div>
        );

    }
}

export default Year;