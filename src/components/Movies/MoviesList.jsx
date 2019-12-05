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

    getMovies = (filters, page, primary_release_year) => {
        const {sort_by} = filters;
        const year = primary_release_year ? `&primary_release_year=${primary_release_year} ` : "";
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}${year}`;
        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {
                console.log(data.total_pages);
                this.setState({
                    movies: data.results,
                    // total_pages:data.total_pages
                });
            });
    };

    componentDidMount() {
        this.getMovies(this.props.filters);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
            this.getMovies(this.props.filters, 1, );
            console.log("componentDidUpdate Filter", prevProps.filters.sort_by, this.props.filters.sort_by);
            this.props.onChangePage(1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page);
            console.log("componentDidUpdate page", prevProps.page, this.props.page)
        }
        // if (this.props.primary_release_year !== prevProps.primary_release_year && this.props.primary_release_year.length === 4) {
        //     //console.log("componentDidUpdate Year", prevProps.primary_release_year, this.props.primary_release_year, "filter ", prevProps.filters.sort_by, this.props.filters.sort_by, "page", prevProps.page, this.props.page);
        //     this.getMovies(this.props.filters, this.props.page, this.props.primary_release_year);
        // }
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
