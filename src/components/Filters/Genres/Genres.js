import React from 'react';
import PropTypes from "prop-types"

const Genres = ({genres, with_genres, onChangeGenre}) => (
    <div className="form-group mb-3">
        <span>Выберите жанр</span>
        {genres.map(genre => {
            return <div className="form-check"
                        key={genre.id}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={genre.id}
                    value={genre.id}
                    onChange={onChangeGenre}
                    name="with_genres"
                    checked={with_genres.includes(genre.id.toString())}
                />
                <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
            </div>
        })}
    </div>
);

Genres.defaultProps = {
    genres: [],

};

Genres.propTypes = {
    genres: PropTypes.array,
    with_genres: PropTypes.array,
    onChangeGenre: PropTypes.func
};

export default Genres;