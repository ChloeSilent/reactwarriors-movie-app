import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import TotalPages from "./TotalPages"

import Genres from "./Genres";
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
            onChangeGenres
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

                <TotalPages total_pages={total_pages}/>

                <Year onChangeFilters={onChangeFilters}
                      primary_release_year={primary_release_year}/>

                <Genres onChangeFilters={onChangeFilters}
                        with_genres={with_genres}
                        onChangeGenres={onChangeGenres}/>


                <Pagination onChangePage={onChangePage} page={page}/>
            </form>
        )
    }
}
