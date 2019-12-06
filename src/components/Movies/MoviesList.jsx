import React, {Component} from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";

export default class MovieList extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],

        };
    }


    getMovies = (filters, page, primary_release_year, updatedGenres) => {
        const {sort_by} = filters;
        const year = primary_release_year ? `&primary_release_year=${primary_release_year} ` : "";
        const genre = updatedGenres ? `&with_genres=${updatedGenres.join('%2C%20')}` : "";
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}${year}${genre}`;
        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {

                this.setState({
                    movies: data.results,
                });
                //console.log(this.state.movies);
                this.props.changeTotalPages(data.total_pages);
            });
    };


    componentDidMount() {
        this.getMovies(this.props.filters);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
            this.getMovies(this.props.filters, 1, this.props.primary_release_year, this.props.updatedGenres);
            this.props.onChangePage(1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page, this.props.primary_release_year, this.props.updatedGenres);
        }
        if (this.props.primary_release_year !== prevProps.primary_release_year) {
            this.getMovies(this.props.filters, this.props.page, this.props.primary_release_year, this.props.updatedGenres);
        }

        if (this.props.updatedGenres !== prevProps.updatedGenres) {
            this.getMovies(this.props.filters, this.props.page, this.props.primary_release_year, this.props.updatedGenres);
        }
    }


    render() {
        const {movies} = this.state;
        return (
            <div className="row">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-6 mb-4">
                            <MovieItem item={movie}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}
