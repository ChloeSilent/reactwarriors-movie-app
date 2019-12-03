import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            filters: {
                sort_by: "vote_average.desc"
            },
            page: 1
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
                                         onChangePage={this.onChangePage}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList filters={filters}
                                    page={this.state.page}
                                    onChangePage={this.onChangePage}/>
                    </div>
                </div>
            </div>
        );
    }
}
