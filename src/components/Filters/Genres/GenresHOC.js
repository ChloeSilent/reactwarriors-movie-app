import React, {PureComponent} from 'react';
import{API_KEY_3, API_URL} from "../../../api/api";
import Genres from "./Genres";

export default Component => class GenresContainer extends PureComponent {
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

            <Component genres={genres}
                    with_genres={with_genres}
                    onChangeGenre={this.onChangeGenre}/>
        );

    }
}

