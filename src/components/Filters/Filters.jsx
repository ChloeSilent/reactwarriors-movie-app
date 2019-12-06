import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import TotalPages from "./TotalPages"

import Genres from "./Genres";

export default class Filters extends React.Component {

    render() {


        const {
            filters: {sort_by},
            onChangeFilters,
            onChangePage,
            page,
            total_pages,
            onChangePrimaryReleaseYears,
            primary_release_year,
            onReset,
            onCheckGenre
        } = this.props;


        return (

            <form className="mb-3">
                <SortBy onChangeFilters={onChangeFilters}
                        sort_by={sort_by}/>
                <div className="btn-group mb-3 pagination">
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
                <TotalPages total_pages={total_pages}/>

                <Year onChangePrimaryReleaseYears={onChangePrimaryReleaseYears}
                      primary_release_year={primary_release_year}/>

                <Genres onCheckGenre={onCheckGenre}/>

                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onReset}
                >Сбросить фильтры
                </button>
            </form>
        )
    }
}
