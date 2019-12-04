import React from 'react';
import PropTypes from "prop-types";

export default class SortBy extends React.Component {
    static propTypes = {
        onChangeFilters: PropTypes.func.isRequired,
        sort_by: PropTypes.string.isRequired,
    };

    static defaultProps = {
        options: [
            {
                label: "Популярные по убыванию",
                value: "popularity.desc"
            },
            {
                label: "Популярные по возростанию",
                value: "popularity.asc"
            },
            {
                label: "Рейтинг по убыванию",
                value: "vote_average.desc"
            },
            {
                label: "Рейтинг по возростанию",
                value: "vote_average.asc"
            }]
    }

    render() {
        const {
            sort_by,
            onChangeFilters,
            options
        } = this.props;


        return (
            <div className="form-group">
                <label htmlFor="sort_by">Сортировать по:</label>
                <select className="form-control"
                        value={sort_by}
                        onChange={onChangeFilters}
                        name="sort_by"
                >
                    {options.map((option, index) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>
        );
    }
}

