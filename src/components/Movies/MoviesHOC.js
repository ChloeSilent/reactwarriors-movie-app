import React from "react";
import CallApi from "../../api/api";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import _ from "lodash";


export default Component => class MoviesHOC extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            isLoading: false
        };
    }


    getMovies = (filters, page) => {

        const {sort_by, primary_release_year, with_genres} = filters;
        const queryStringParams = {
            language: "ru-RU",
            sort_by: sort_by,
            page: page,
            year: primary_release_year,
            with_genres: with_genres,

        };

        this.setState({
            isLoading: true
        });

        CallApi.get('/discover/movie', {
            params: queryStringParams
        }).then(data => {

            this.setState({
                movies: data.results,
                isLoading: false
            });

            this.props.onChangeTotalPages(data.total_pages);
        });
    };


    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
    }


    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
            this.getMovies(this.props.filters, 1);
            this.props.onChangePage(1);
        }
        if (!_.isEqual(this.props.page, prevProps.page)) {
            this.getMovies(this.props.filters, this.props.page);
        }
    }


    render() {
        const {movies, isLoading} = this.state;

        return (
            <Component movies={movies}
                       isLoading={isLoading}/>
        );
    }
}
