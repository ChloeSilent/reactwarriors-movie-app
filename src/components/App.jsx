import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import {API_KEY_3, API_URL, fetchApi} from "../api/api";

const cookies = new Cookies();

export const AppContext = React.createContext();

const initialState = {
    user: null,
    session_id: null,
    filters: {
        sort_by: "popularity.desc",
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

    updateUser = (user) => {
        this.setState({
            user
        })
    };
    /*maxAge: 2592000*/
    updateSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: '/',
            maxAge: 2000
        });
        this.setState({
            session_id
        })
    };

    onChangeFilters = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [name]: value
            }
        }));
    };


    onChangeTotalPages = total_pages => {
        this.setState({
            total_pages
        });
    };

    onChangePage = page => {

        this.setState({
            page
        });
    };

    onReset = event => {
        event.preventDefault();
        this.setState({...initialState})

    };

    componentDidMount() {
        const session_id = cookies.get("session_id");
        if (session_id) {
            fetchApi(
                `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
            ).then(user => {
                this.updateUser(user);
            });
        }
    }

    render() {
        const {filters, page, total_pages, user, session_id} = this.state;

        return (
            <AppContext.Provider
            value={{
                user: user,
                updateUser: this.updateUser,
                session_id: session_id,
                updateSessionId: this.updateSessionId
            }}>
                <div>
                    <Header user={user}
                            updateSessionId={this.updateSessionId}/>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>Фильтры:</h3>
                                        <Filters filters={filters}
                                                 onChangeFilters={this.onChangeFilters}
                                                 page={page}
                                                 total_pages={total_pages}
                                                 onChangePage={this.onChangePage}
                                                 onReset={this.onReset}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <MoviesList
                                    filters={filters}
                                    page={page}
                                    onChangePage={this.onChangePage}
                                    primary_release_year={filters.primary_release_year}
                                    onChangeTotalPages={this.onChangeTotalPages}
                                    with_genres={filters.with_genres}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        );
    }
};
