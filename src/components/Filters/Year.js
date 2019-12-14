import React, {Component} from 'react';


const getYears = () => {
    let opt = [];
    for (let i = this.props.rangeReleaseYears.from; i <= this.props.rangeReleaseYears.to; i++) {
        opt.push(i);
    }
    return opt;
};

class Year extends Component {


    static defaultProps = {
        rangeReleaseYears: {
            from: 1950,
            to: 2025
        },
        options: []
    };

    render() {
        const options = getYears();
        const {primary_release_year,
            onChangeFilters,
        } = this.props;

        return (
            <div className="form-group row">
                <label htmlFor="sort_by">Сортировать по:</label>
                <select className="form-control"
                        value={primary_release_year}
                        onChange={onChangeFilters}
                        name="primary_release_year"
                >
                    <option
                            value={false}>{this.props.releaseYears}</option>
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