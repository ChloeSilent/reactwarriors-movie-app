import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";

export default class Filters extends React.Component {
    render() {

        const {
            filters: {sort_by},
            onChangeFilters,
            onChangePage,
            page,
            onChangeYear
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
                <Year onChangeYear={onChangeYear}/>

            </form>
        )
            ;
    }
}
