import React, {Component} from 'react';

class Year extends Component {


    static defaultProps = {
        releaseYears: {
            from: 1950,
            to: 2025
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