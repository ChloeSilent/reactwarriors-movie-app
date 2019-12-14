import React, {Component} from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";
import queryString from 'query-string'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import _ from "lodash";

const style = {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

export default class MovieList extends Component {
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
            api_key: API_KEY_3,
            language: "ru-RU",
            sort_by: sort_by,
            page: page,
            year: primary_release_year,
            with_genres: with_genres,

        };
        const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
        this.setState({
            isLoading: true
        });

        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {

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


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(this.props.filters, prevProps.filters) || !_.isEqual(this.props.page, prevProps.page)) {

            this.getMovies(this.props.filters, this.props.page);
        }
    }


    render() {
        const {movies, isLoading} = this.state;
        return (
            <div className="row">
                {isLoading ? <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={5000}
                    style={style}

                /> : movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-6 mb-4">
                            <MovieItem item={movie}/>
                        </div>
                    );
                })
                }
            </div>
        );
    }
}
