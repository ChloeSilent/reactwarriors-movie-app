import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            filters: {
                sort_by: ["popularity.desc"]
            },
            page: 1,
            total_pages: "",
            primary_release_year: []
        }
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

    onChangePage = page => {
        this.setState({
            page
        })
    };

    // onChangePrimaryReleaseYear = event => {
    //     event.preventDefault();
    //     const primary_release_year = event.target.value;
    //
    //     this.setState(prevState => ({
    //             primary_release_year
    //         })
    //     );
    //
    //
    // };
    //
    // keyPressOnYear = event => {
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //     }
    // };

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
                                         //onChangePrimaryReleaseYear={this.onChangePrimaryReleaseYear}
                                         // primary_release_year={this.state.primary_release_year}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}
                                    page={this.state.page}
                                    onChangePage={this.onChangePage}
                                    //primary_release_year={this.state.primary_release_year}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
