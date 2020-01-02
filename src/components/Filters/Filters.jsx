import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres/Genres";
import Pagination from "./Pagination";

export default class Filters extends React.Component {

    render() {


        const {
            filters: {sort_by, primary_release_year, with_genres},
            onChangeFilters,
            onChangePage,
            page,
            total_pages,
            onReset,
        } = this.props;


        return (

            <form className="mb-3">
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onReset}
                >Сбросить фильтры
                </button>
                <SortBy onChangeFilters={onChangeFilters}
                        sort_by={sort_by}/>
                <PrimaryReleaseYear onChangeFilters={onChangeFilters}
                      primary_release_year={primary_release_year}/>
                <Genres onChangeFilters={onChangeFilters}
                        with_genres={with_genres}/>
                <Pagination onChangePage={onChangePage}
                            page={page}
                            total_pages={total_pages}/>
            </form>
        )
    }
}
