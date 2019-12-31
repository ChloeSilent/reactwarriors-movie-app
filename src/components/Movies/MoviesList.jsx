import React from "react";
import MovieItem from "./MovieItem";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import PropTypes from "prop-types";

const style = {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

const MoviesList = ({isLoading , movies}) => (
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

MoviesList.defaultProps = {
    movies: []
};

MoviesList.propTypes = {
    movies: PropTypes.array,
    isLoading: PropTypes.bool
};

export default MoviesList

