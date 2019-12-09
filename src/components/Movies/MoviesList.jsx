import React, {Component} from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";
import queryString from 'query-string'

export default class MovieList extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
        };
    }


    getMovies = (filters, page) => {
        const {sort_by, primary_release_year, with_genres} = filters;
        const queryStringParams = {
            api_key: API_KEY_3,
            language: "ru-RU",
            sort_by: sort_by,
            page: page,
            year: primary_release_year,
            with_genres: with_genres,

        };
        const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;

        console.log(link);
        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {

                this.setState({
                    movies: data.results,
                });

                this.props.onChangeTotalPages(data.total_pages);
            });
    };


    componentDidMount() {
        this.getMovies(this.props.filters);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
            this.getMovies(this.props.filters, 1);
            this.props.onChangePage(1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page);
        }
        if (this.props.primary_release_year !== prevProps.primary_release_year) {
            this.getMovies(this.props.filters, this.props.page);
        }

        if (this.props.filters.with_genres !== prevProps.filters.with_genres) {
            this.getMovies(this.props.filters, this.props.page);

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
