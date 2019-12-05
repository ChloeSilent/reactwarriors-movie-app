import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import PropTypes from "prop-types";

export default class Filters extends React.Component {


    render() {

        const {
            filters: {sort_by},
            onChangeFilters,
            onChangePage,
            page,
            total_pages
            // onChangePrimaryReleaseYear,
            // primary_release_year,
            // keyPressOnYear
        } = this.props;

        return (

            <form className="mb-3">
                <SortBy onChangeFilters={onChangeFilters}
                        sort_by={sort_by}/>
                <div className="btn-group row mb-3 container-fluid">
                    <button
                        type="button"
                        className="btn btn-light"
                        disabled={page === 1}
                        onClick={onChangePage.bind(null, page - 1)}
                    >
                        Назад
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={onChangePage.bind(null, page + 1)}
                    >
                        Вперед
                    </button>
                </div>
                <span>{total_pages}</span>
               <Year sort_by={sort_by}/>

            </form>
        )
            ;
    }
}
