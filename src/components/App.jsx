import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const initialState = {
    filters: {
        sort_by: ["popularity.desc"],
        primary_release_year: new Date().getFullYear(),
        with_genres: []
    },
    page: 1,
    total_pages: "",

};


export default class App extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

    onChangeFilters = event => {
        const {name, value} = event.target;

        if (event.target.name === "with_genres") {
            console.log(this.state.with_genres);
            if (event.target.checked) {
                console.log("checked");
                this.setState(state => ({
                    filters: {
                        ...state.filters,
                        [name]: [value]
                    }
                }))
            } else {
                // this.setState(state => ({
                //     filters: {
                //         with_genres: this.state.with_genres.filter((genre) => genre !== event.target.value)
                //     }
                // }));
                this.setState(prevState => ({
                    filters: {
                        with_genres: [event.target.value, ...prevState.filters.with_genres]
                    }
                }))
            }
        }
        console.log("with_genres: ", this.state.filters.with_genres);

        this.setState(state => ({
                filters: {
                    ...state.filters,
                    [name]: [value]
                }
            })
        )
    }



    onChangeTotalPages = page => {

        if (page !== this.state.total_pages) {
            this.setState(state => ({
                total_pages: page,
            }));
        }
    };

    onChangePage = page => {
        this.setState({
            page
        });
    };

    onReset = event => {
        event.preventDefault()
        this.setState({...initialState})
    };

    // onCheckGenre = event => {
    //
    //     if (event.target.checked) {
    //         this.setState({
    //             filters: {
    //                 updatedGenres: [...this.state.filters.updatedGenres, event.target.value]
    //             }
    //         })
    //
    //     } else {
    //         let remove = this.state.filters.updatedGenres.indexOf(event.target.value);
    //         this.setState({
    //             filters: {
    //                 updatedGenres: this.state.updatedGenres.filter((_, i) => i !== remove)
    //             }
    //             }
    //
    //         );
    //     }
    //
    // };


    render() {
        const {filters} = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters filters={this.state.filters}
                                         onChangeFilters={this.onChangeFilters}
                                         page={this.state.page}
                                         total_pages={this.state.total_pages}
                                         onChangePage={this.onChangePage}
                                         primary_release_year={this.state.filters.primary_release_year}
                                         onReset={this.onReset}
                                         with_genres={this.state.filters.with_genres}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}
                                    page={this.state.page}
                                    onChangePage={this.onChangePage}
                                    primary_release_year={this.state.filters.primary_release_year}
                                    onChangeTotalPages={this.onChangeTotalPages}
                                    with_genres={this.state.filters.with_genres}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
