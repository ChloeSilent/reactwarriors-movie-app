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
            onCheckGenre
        } = this.props;


        return (
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
        );

    }
}

export default Genres;