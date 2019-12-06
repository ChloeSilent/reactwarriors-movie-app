import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import TotalPages from "./TotalPages"
import {API_KEY_3, API_URL} from "../../api/api";

export default class Filters extends React.Component {
    constructor() {
        super();

        this.state = {
            genres: [],
        };
    }


    getGenres = () => {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    genres: data.genres
                });
            });
    };

    componentDidMount() {
        this.getGenres();
    }

    render() {
        const genres = this.state.genres;

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


                <div className="mb-3">
                    {genres.map(genre => {
                        return <div className="form-check"
                                    key={genre.id}>
                            <input className="form-check-input"
                                   type="checkbox" id={genre.id}
                                   value={genre.id}
                                   onChange={onCheckGenre}
                            />
                            <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
                        </div>
                    })}
                </div>

                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onReset}
                >Сбросить фильтры
                </button>
            </form>
        )
    }
}
