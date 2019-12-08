import React, {Component} from 'react';
import {API_KEY_3, API_URL} from "../../api/api";


class Genres extends Component {
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
            onChangeFilters
        } = this.props;


        return (
            <div className="form-group mb-3">
                <span>Выберите жанр</span>
                {genres.map(genre => {
                    return <div className="form-check"
                                key={genre.id}>
                        <input className="form-check-input"
                               type="checkbox" id={genre.id}
                               value={genre.id}
                               onChange={onChangeFilters}
                               name="with_genres"
                        />
                        <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
                    </div>
                })}
            </div>
        );

    }
}

export default Genres;