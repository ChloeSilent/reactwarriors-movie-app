import React, {Component} from 'react';
import {API_KEY_3, API_URL} from "../../api/api";

const initialState = {
    all_genres: [],
    selected_genres: []
};


class Genres extends Component {
    constructor() {
        super();

        this.state = {
            all_genres: [],
            selected_genres: []
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
                    all_genres: data.genres
                });
            });
    };

    componentDidMount() {
        this.getGenres();
    }


    updateGenres = (event) => {
        const {value} = event.target;
        if (event.target.checked) {
            this.setState(state => ({
                    ...state.selected_genres,
                    selected_genres: [...state.selected_genres, value]
                })
            );
        } else {
            const newList = this.state.selected_genres.filter(genre => genre !== event.target.value);
            this.setState(state => ({
                    ...state.selected_genres,
                    selected_genres: newList
                })
            );
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selected_genres !== this.state.selected_genres) {
            this.props.onChangeGenres(this.state.selected_genres);
        }
    }

    render() {

        const {all_genres} = this.state;

        return (
            <div className="form-group mb-3">
                <span>Выберите жанр</span>
                {all_genres.map(genre => {
                    return <div className="form-check"
                                key={genre.id}>
                        <input className="form-check-input"
                               type="checkbox" id={genre.id}
                               value={genre.id}
                               onChange={this.updateGenres}
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