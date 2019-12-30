import React from "react";
import {API_KEY_3, API_URL, fetchApi} from "../../../api/api";

export default class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPassword: "",
        errors: {},
        submitting: false
    };


    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                base: null,
                ...prevState.errors,
                [name]: null
            }
        }));
    };

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

    validateFields = () => {
        const errors = {};

        if (this.state.username === "") {
            errors.username = "Not empty";
        }

        if (this.state.repeatPassword === "") {
            errors.repeatPassword = "Введите пароль для потдверждения";
        }

        if (this.state.password !== this.state.repeatPassword ) {
            errors.repeatPassword = "Должен быть равен паролю";
        }

        return errors;
    };

    onSubmit = () => {
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
                this.props.updateSessionId(data.session_id);
                return fetchApi(
                    `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
                        data.session_id
                    }`
                );
            })
            .then(user => {
                console.log("user", user);
                this.props.updateUser(user);
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
        const {username, password, errors, submitting, repeatPassword} = this.state;

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
                    <div className="form-group">
                        <label htmlFor="repeatPassword">Подтвердите пароль</label>
                        <input
                            type="password"
                            className={errors.repeatPassword ? "form-control invalid-input": "form-control"}
                            id="repeatPassword"
                            placeholder="Пароль"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback">{errors.repeatPassword}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        Вход
                    </button>
                    {errors.base && (
                        <div className="invalid-feedback text-center">{errors.base}</div>
                    )}
                </form>
            </div>
        );
    }
}