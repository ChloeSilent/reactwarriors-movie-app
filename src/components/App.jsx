import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const initialState = {
    filters: {
        sort_by: ["popularity.desc"],
        primary_release_year: new Date().getFullYear(),
        updatedGenres: []
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

        if(event.target.name === "with_genres"){
            // if (event.target.checked) {
            //     this.setState(prevState => ({
            //         filters: newFilters
            //     }))
            //
            // } else {
            //     let remove = this.state.filters.updatedGenres.indexOf(event.target.value);
            //     this.setState({
            //             filters: {
            //                 updatedGenres: this.state.updatedGenres.filter((_, i) => i !== remove)
            //             }});
            //     this.setState(prevState => ({
            //         filters: newFilters
            //     }))
            // }
            console.log(event.target.id);
        }

        this.setState(state => ({
                filters: {
                    ...state.filters,
                    [name]: [value]
                }
            })
        )
    };


    changeTotalPages = page => {

        if(page !== this.state.total_pages){
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
                                         updatedGenres={this.state.filters.updatedGenres}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}
                                    page={this.state.page}
                                    onChangePage={this.onChangePage}
                                    primary_release_year={this.state.filters.primary_release_year}
                                    changeTotalPages={this.changeTotalPages}
                                    updatedGenres={this.state.filters.updatedGenres}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
