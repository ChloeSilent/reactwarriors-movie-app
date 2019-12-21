import React from "react";
import {API_KEY_3, API_URL} from "../../../api/api";

export default class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        errors: {}
    };

    // onChange = e => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     this.setState(prevState => ({
    //         [name]: value,
    //         errors: {
    //             ...prevState.errors,
    //             [name]: null
    //         }
    //     }));
    // };

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: null
            }
        }));
    };



    // handleBlur = () => {
    //     console.log("BLUR");
    //     const errors = this.validateFields();
    //     if (Object.keys(errors).length > 0) {
    //         console.log("Error");
    //         this.setState(prevState => ({
    //             errors: {
    //                 ...prevState.errors,
    //                 ...errors
    //             }
    //         }))
    //     }
    //
    // };
    handleBlur = () => {
        console.log("on blur");
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        }
    };



    // validateFields = () => {
    //     const errors = {};
    //
    //     if (this.state.username === "") {
    //         errors.username = "Not empty";
    //     }
    //
    //     return errors;
    // };
    validateFields = () => {
        const errors = {};

        if (this.state.username === "") {
            errors.username = "Not empty";
        }

        return errors;
    };

    // onSubmit = async () => {
    //     const fetchApi = (url, options = {}) => {
    //         return new Promise((resolve, reject) => {
    //             fetch(url, options)
    //                 .then(response => {
    //                     if (response.status < 400) {
    //                         return response.json()
    //                     } else {
    //                         throw response;
    //                     }
    //                 }).then(data => {
    //                 resolve(data)
    //             }).catch(response => {
    //                 response.json().then(
    //                     error => {
    //                         reject();
    //                         console.log("error is ", error);
    //                     }
    //                 );
    //             })
    //         });
    //     };
    //
    //     try {
    //         const data = await fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`);
    //         const result = await fetchApi(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 "headers": {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         username: this.state.username,
    //                         password: this.state.password,
    //                         request_token: data.request_token
    //                     })
    //             }
    //         );
    //
    //         const {session_id} = await fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 "headers": {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     request_token: result.request_token
    //                 })
    //             }
    //         );
    //         console.log("session_id ", session_id);
    //     } catch (error) {
    //         console.log("error ", error)
    //     }
    // };

    onSubmit = () => {
        const fetchApi = (url, options = {}) => {
            return new Promise((resolve, reject) => {
                fetch(url, options)
                    .then(response => {
                        if (response.status < 400) {
                            return response.json();
                        } else {
                            throw response;
                        }
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(response => {
                        response.json().then(error => {
                            reject(error);
                        });
                    });
            });
        };
        this.setState({
            submitting: true
        });
        fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
            .then(data => {
                return fetchApi(
                    `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            username: this.state.username,
                            password: this.state.password,
                            request_token: data.request_token
                        })
                    }
                );
            })
            .then(data => {
                return fetchApi(
                    `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            request_token: data.request_token
                        })
                    }
                );
            })
            .then(data => {
                console.log("session", data);
                this.setState({
                    submitting: false
                });
            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    submitting: false,
                    errors: {
                        base: error.status_message
                    }
                });
            });
    };

    // onLogin = e => {
    //     e.preventDefault();
    //     const errors = this.validateFields();
    //     if (Object.keys(errors).length > 0) {
    //         console.log("Error");
    //         this.setState(prevState => ({
    //             errors: {
    //                 ...prevState.errors,
    //                 ...errors
    //             }
    //         }))
    //     } else {
    //         this.onSubmit()
    //     }
    // };

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        } else {
            this.onSubmit();
        }
    };

    render() {
        const {username, password, errors} = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                    >
                        Вход
                    </button>
                </form>
            </div>
        );
    }
}