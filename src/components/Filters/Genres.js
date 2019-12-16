import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL} from "../../api/api";


class Genres extends PureComponent {
    constructor() {
        super();

        this.state = {
            genres: [],
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
                    genres: data.genres
                });
            });
    };

    componentDidMount() {
        this.getGenres();
    }

    onChangeGenre = (event) => {
        const {value, checked} = event.target;
        const {with_genres} = this.props;
        console.log(event.target);
        this.props.onChangeFilters({
            target: {
                name: "with_genres",
                value: checked ?
                    [...with_genres, value] :
                    with_genres.filter((genre) => genre !== value)
            }
        })

    };


    render() {

        const {genres} = this.state;
        const {with_genres} = this.props;
        return (

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
                            onChange={this.onChangeGenre}
                            name="with_genres"
                            //checked={with_genres.includes(genre.id)}
                        />
                        <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
                    </div>
                })}
            </div>
        );

    }
}

export default Genres;