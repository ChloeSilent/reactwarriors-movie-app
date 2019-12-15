import React, {PureComponent} from 'react';

const getYears = (from, to) => {
    let opt = [];
    for (let i = from; i <= to; i++) {
        opt.push(i);
    }
    return opt;
};

class PrimaryReleaseYear extends PureComponent {


    static defaultProps = {
        years: getYears(1950, 2025)
    };

    render() {
        const {
            primary_release_year,
            onChangeFilters, years
        } = this.props;


        return (
            <div className="form-group row">
                <label htmlFor="sort_by">Год выпуска:</label>
                <select className="form-control"
                        value={primary_release_year}
                        onChange={onChangeFilters}
                        name="primary_release_year"
                >
                    <option
                        value={false}>{this.props.releaseYears}</option>
                    {years.map((option) => {
                        return <option key={option}
                                       value={option}>{option}</option>
                    })}
                </select>
            </div>
        );

    }
}

export default PrimaryReleaseYear;