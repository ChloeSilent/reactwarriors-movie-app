import React, {PureComponent} from 'react';
import CallApi from "../../../api/api";

export default Component => class GenresContainer extends PureComponent {
    constructor() {
        super();

        this.state = {
            genres: [],
            selected_genres: []
        };
    }

    getGenres = () => {
        CallApi.get("/genre/movie/list", {
            body: {
                language: "ru-RU"
            }
        }).then(data => {
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

