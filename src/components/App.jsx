import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const initialState = {
    filters: {
        sort_by: ["popularity.desc"]
    },
    page: 1,
    total_pages: "",
    primary_release_year: "",
    updatedGenres: []
};


export default class App extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

    onChangeFilters = (event) => {
        const {name, value} = event.target;
        const newFilters = {
            ...this.state.filters,
            [name]: [value]
        };

        this.setState(prevState => ({
                filters: newFilters
            })
        )
    };

    onChangePrimaryReleaseYears = (event) => {

        const {name, value} = event.target;
        const primary_release_year = {
            [name]: value
        };

        this.setState(state => ({
            primary_release_year: primary_release_year.primary_release_year,
        }));

    };

    changeTotalPages = page => {
        this.setState(state => ({
            total_pages: page,
        }));

        //console.log(page);
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

    onCheckGenre = event => {
        if (event.target.checked) {
            this.setState({
                updatedGenres: [...this.state.updatedGenres, event.target.value]
            })

        } else {
            let remove = this.state.updatedGenres.indexOf(event.target.value);
            this.setState({
                    updatedGenres: this.state.updatedGenres.filter((_, i) => i !== remove)
                },
                ()=>{console.log('updatedGenres', this.state.updatedGenres);}
            );
        }

    };


    render() {
        const {filters} = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{width: "100%"}}>
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters filters={filters}
                                         onChangeFilters={this.onChangeFilters}
                                         page={this.state.page}
                                         total_pages={this.state.total_pages}
                                         onChangePage={this.onChangePage}
                                         onChangePrimaryReleaseYears={this.onChangePrimaryReleaseYears}
                                         primary_release_year={this.state.primary_release_year}
                                         onReset={this.onReset}
                                         onCheckGenre={this.onCheckGenre}
                                         updatedGenres={this.state.updatedGenres}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}
                                    page={this.state.page}
                                    onChangePage={this.onChangePage}
                                    primary_release_year={this.state.primary_release_year}
                                    onChangePage={this.onChangePage}
                                    changeTotalPages={this.changeTotalPages}
                                    updatedGenres={this.state.updatedGenres}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
